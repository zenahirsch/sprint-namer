const db = require("../db");

exports.DatabaseObject = class DatabaseObject {
  constructor(collection, dbFields) {
    this._collection = collection;
    this._dbFields = dbFields;
  }

  async create() {
    const data = {};

    this._dbFields.forEach((field) => {
      data[field] = this[field];
    });

    const response = await db.create(this._collection, data);

    this._ref = response.ref;

    return this;
  }

  async update() {
    const data = {};

    this._dbFields.forEach((field) => {
      data[field] = this[field];
    });

    const response = await db.update(this._collection, this.id, data);

    this._ref = response.ref;

    return this;
  }

  async delete() {
    await db.remove(this._collection, this.id);
  }

  get id() {
    return this._ref.id;
  }

  get ref() {
    return this._ref;
  }

  get client() {
    return this._client;
  }

  get collection() {
    return this._collection;
  }

  static async load(id) {
    const { ref, data } = await db.getByCollectionAndId(
      this.collectionName,
      id
    );

    let object = new this();

    object._dbFields.forEach((field) => {
      object[field] = data[field];
    });

    object._ref = ref;

    return object;
  }
};
