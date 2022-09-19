const { Entry } = require("../../objects/Entry");
const { Sprint } = require("../../objects/Sprint");

const handleReactionAdded = async ({ event, context }) => {
  const sprint = await Sprint.getByVotingMessageTs(event.item.ts);
  const emoji = event.reaction;
  const entry = await Entry.getBySprintIdAndEmoji(sprint.id, emoji);
  
  entry.votes = entry.votes + 1;
  await entry.update();
};

const handleReactionRemoved = async ({ event }) => {
  const sprint = await Sprint.getByVotingMessageTs(event.item.ts);
  const emoji = event.reaction;
  const entry = await Entry.getBySprintIdAndEmoji(sprint.id, emoji);
  
  entry.votes = entry.votes - 1;
  await entry.update();
};

exports.handleReactionAdded = handleReactionAdded;
exports.handleReactionRemoved = handleReactionRemoved;