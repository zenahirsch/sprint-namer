const { Sprint } = require("../../objects/Sprint");
const { Entry } = require("../../objects/Entry");

const { SectionBlock } = require("../../objects/SectionBlock");

const { getMax } = require("../../utils/getMax");

let { copy } = require("../../copy.js");

const handleEndVoting = async ({ ack, payload, say }) => {
  await ack();

  const sprint = await Sprint.load(payload.value);

  if (!sprint.voting_open) {
    return false; // @todo - better messaing to user that voting has already ended
  }

  sprint.voting_open = false;
  await sprint.update();

  const entries = await sprint.getEntries();

  const entriesToVotes = {};

  for (const entry of entries) {
    entriesToVotes[entry.id] = entry.votes;
  }

  const entriesWithMostVotes = getMax(entriesToVotes);

  let winningEntry = null;
  let is_tie = false;

  if (entriesWithMostVotes.length === 1) {
    winningEntry = await Entry.load(entriesWithMostVotes[0]);
  } else {
    const randomWinningEntryId =
      entriesWithMostVotes[
        Math.floor(Math.random() * entriesWithMostVotes.length)
      ];
    winningEntry = await Entry.load(randomWinningEntryId);
    is_tie = true;
  }

  let tiedWords = [];

  if (is_tie) {
    for (const entryId of entriesWithMostVotes) {
      const entry = await Entry.load(entryId);
      tiedWords.push(entry.word);
    }
  }

  let blocks = [];

  if (!is_tie) {
    const winningEntryBlock = new SectionBlock(copy.winning_entry, {
      winning_word: winningEntry.word,
      user: winningEntry.user,
    });

    blocks.push(winningEntryBlock.render());
  } else {
    const tieWinningEntryBlock = new SectionBlock(copy.tie_winning_entry, {
      num_way: entriesWithMostVotes.length,
      winning_word: winningEntry.word,
      tied_words: tiedWords.join("\n"),
      user: winningEntry.user,
    });

    blocks.push(tieWinningEntryBlock.render());
  }

  say({ blocks });
};

exports.handleEndVoting = handleEndVoting;
