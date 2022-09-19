const { Sprint } = require("../../objects/Sprint");
const { Suggestion } = require("../../objects/Suggestion");

const { SectionBlock } = require("../../objects/SectionBlock");
const { ButtonBlock } = require("../../objects/ButtonBlock");

const { EmojiPicker } = require("../../libs/emoji_picker");
const { shuffleArray } = require("../../utils/shuffleArray");

let { copy } = require("../../copy.js");

const handleStartVoting = async ({ ack, body, client, say }) => {
  await ack();

  const emojiPicker = new EmojiPicker();

  const sprint = await Sprint.getByMessageTs(body.message.ts);

  if (sprint.voting_open) {
    return false; // do something better here to alert the user
  }

  const suggestions = await sprint.getSuggestions();

  shuffleArray(suggestions);

  const entries = [];

  const votingIntroBlock = new SectionBlock(copy.voting_intro);

  const blocks = [votingIntroBlock.render()];

  for (let i = 0; i < suggestions.length; i++) {
    const suggestion = suggestions[i];

    const entry = await suggestion.getOrCreateEntry(
      emojiPicker.getRandomEmoji()
    );

    entries.push(entry);

    const votingOptionBlock = new SectionBlock(copy.voting_option, {
      emoji: entry.emoji,
      word: suggestion.word,
      user: suggestion.user,
    });

    blocks.push(votingOptionBlock.render());
  }

  const endVotingPromptBlock = new ButtonBlock(
    copy.end_voting_prompt,
    "end_voting",
    sprint.id
  );

  blocks.push(endVotingPromptBlock.render());

  const response = await client.chat.postMessage({
    channel: body.channel.id,
    blocks: blocks,
  });

  for (const entry of entries) {
    await client.reactions.add({
      channel: body.channel.id,
      timestamp: response.message.ts,
      name: entry.emoji,
    });
  }

  sprint.voting_open = true;
  sprint.voting_message_ts = response.message.ts;
  await sprint.update();
};

exports.handleStartVoting = handleStartVoting;
