const db = require("../db");

const { DatabaseObject } = require("./DatabaseObject");
const { Suggestion } = require("./Suggestion");
const { Entry } = require("./Entry");

const COLLECTION_NAME = "sprints";

const DB_FIELDS = [
  "theme",
  "letter",
  "message_ts",
  "voting_open",
  "voting_message_ts",
];

class Sprint extends DatabaseObject {
  constructor() {
    super(COLLECTION_NAME, DB_FIELDS);
  }

  static get collectionName() {
    return COLLECTION_NAME;
  }

  async getSuggestions() {
    const { data: refs } = await db.getRefsByIndexAndValues(
      "suggestions_by_sprint_id",
      this.id
    );

    const suggestions = [];

    for (const ref of refs) {
      suggestions.push(await Suggestion.load(ref.id));
    }

    return suggestions;
  }

  async getEntries() {
    const { data: refs } = await db.getRefsByIndexAndValues(
      "entries_by_sprint_id",
      this.id
    );

    const entries = [];

    for (const ref of refs) {
      entries.push(await Entry.load(ref.id));
    }

    return entries;
  }

  static async getByMessageTs(message_ts) {
    const { ref } = await db.getFirstRefByIndexAndValues(
      "sprints_by_message_ts",
      message_ts
    );

    return await Sprint.load(ref.id);
  }

  static async getByVotingMessageTs(voting_message_ts) {
    const { ref } = await db.getFirstRefByIndexAndValues(
      "sprints_by_voting_message_ts",
      voting_message_ts
    );

    return await Sprint.load(ref.id);
  }
}

exports.Sprint = Sprint;
