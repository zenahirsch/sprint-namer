const { DatabaseObject } = require("./DatabaseObject");

const db = require("../db");

const COLLECTION_NAME = "entries";

const DB_FIELDS = [
  "suggestion_id",
  "sprint_id",
  "emoji",
  "word",
  "user",
  "votes",
];

class Entry extends DatabaseObject {
  constructor() {
    super(COLLECTION_NAME, DB_FIELDS);
  }

  static get collectionName() {
    return COLLECTION_NAME;
  }

  static async getBySprintIdAndEmoji(sprintId, emoji) {
    const { ref } = await db.getFirstRefByIndexAndValues(
      "entry_by_sprint_id_and_emoji",
      sprintId,
      emoji
    );

    return await Entry.load(ref.id);
  }
}

exports.Entry = Entry;
