const { handleMessage } = require("./events/handleMessage");
const { handleReactionAdded, handleReactionRemoved } = require("./events/handleReaction");

exports.handleMessage = handleMessage;
exports.handleReactionAdded = handleReactionAdded;
exports.handleReactionRemoved = handleReactionRemoved;