const { App, subtype } = require("@slack/bolt");

const { handleStartVoting, handleEndVoting } = require("./handlers/actions");

const {
  handleMessage,
  handleReactionAdded,
  handleReactionRemoved,
} = require("./handlers/events");

const { handleNameSprint, handleVote } = require("./handlers/commands");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// Actions
app.action("start_voting", handleStartVoting);
app.action("end_voting", handleEndVoting);

// Events
app.event("reaction_added", handleReactionAdded);
app.event("reaction_removed", handleReactionRemoved);

// Commands
app.command("/name-sprint", handleNameSprint);

// Messages
app.event("message", handleMessage);
// @todo - Listen for message deletions, and remove the corresponding suggestion

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
