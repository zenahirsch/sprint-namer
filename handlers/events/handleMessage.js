const { Sprint } = require("../../objects/Sprint");
const { Suggestion } = require("../../objects/Suggestion");

const handleMessage = async ({ event }) => {
  try {
    const { text: word, user, thread_ts } = event;

    const sprint = await Sprint.getByMessageTs(thread_ts);

    /**
     * The presence of `event_ts` in the event object indicates
     * that this is a reply in a thread.
     * See https://api.slack.com/events/message/message_replied
     */
    if (thread_ts && thread_ts === sprint.message_ts) {
      const suggestion = new Suggestion();
      suggestion.word = word;
      suggestion.sprint_id = sprint.id;
      suggestion.user = user;
      await suggestion.create();
    }
  } catch (error) {
    console.error(error);
  }
};

exports.handleMessage = handleMessage;
