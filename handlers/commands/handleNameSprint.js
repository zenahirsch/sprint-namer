const { Sprint } = require("../../objects/Sprint");
const { Suggestion } = require("../../objects/Suggestion");
const { SectionBlock } = require("../../objects/SectionBlock");
const { ButtonBlock } = require("../../objects/ButtonBlock");

const { WordSuggester } = require("../../libs/word_suggester");

let { copy } = require("../../copy.js");

const handleNameSprint = async ({
  ack,
  body,
  command,
  client,
  say,
  context,
}) => {
  await ack();

  const { text } = command;
  const args = text.split(" ");
  const theme = args[0] || "general";
  const letter = args[1] || "a";

  const suggester = new WordSuggester(theme, letter);

  const { channel_id } = body;

  let sprint = new Sprint();
  sprint.theme = theme;
  sprint.letter = letter;
  sprint.voting_open = false;
  await sprint.create();

  const suggestionsIntroBlock = new SectionBlock(copy.suggestions_intro, {
    theme: theme,
    letter: letter.toUpperCase(),
  });

  const startVotingPromptBlock = new ButtonBlock(
    copy.start_voting_prompt,
    "start_voting",
    sprint.id
  );

  const response = await client.chat.postMessage({
    channel: channel_id,
    blocks: [suggestionsIntroBlock.render(), startVotingPromptBlock.render()],
  });

  sprint.message_ts = response.message.ts;
  await sprint.update();

  const suggestedWords = await suggester.getForThemeAndLetter(3);

  for (const word of suggestedWords) {
    let suggestion = new Suggestion();
    suggestion.sprint_id = sprint.id;
    suggestion.word = word;
    suggestion.user = context.botUserId;
    await suggestion.create();

    say({
      text: word,
      thread_ts: response.message.ts,
    });
  }
};

exports.handleNameSprint = handleNameSprint;
