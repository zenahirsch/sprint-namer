const { DatabaseObject } = require("./DatabaseObject");
const { Entry } = require("./Entry");

const db = require("../db");

const COLLECTION_NAME = "suggestions";

const DB_FIELDS = ["sprint_id", "word", "user"];

class Suggestion extends DatabaseObject {
  constructor() {
    super(COLLECTION_NAME, DB_FIELDS);
  }

  static get collectionName() {
    return COLLECTION_NAME;
  }

  async getOrCreateEntry(emoji) {
    const { data: refs } = await db.getRefsByIndexAndValues(
      "entries_by_suggestion_id",
      this.id
    );

    if (refs.length > 0) {
      return Entry.load(refs[0].id);
    }

    const entry = new Entry();
    entry.suggestion_id = this.id;
    entry.sprint_id = this.sprint_id;
    entry.emoji = emoji;
    entry.word = this.word;
    entry.user = this.user;
    entry.votes = 0;
    await entry.create();

    return entry;
  }
}

exports.Suggestion = Suggestion;
