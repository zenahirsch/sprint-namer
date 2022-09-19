const faunadb = require("faunadb");

const {
  Collection,
  Create,
  Delete,
  Get,
  Index,
  Lambda,
  Map,
  Match,
  Paginate,
  Ref,
  Update,
  Var,
} = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
  domain: "db.us.fauna.com",
  port: 443,
  scheme: "https",
});

exports.getByCollectionAndId = (collection, id) => {
  try {
    return client.query(Get(Ref(Collection(collection), id)));
  } catch (error) {
    console.error(error);
  }
};

exports.create = (collection, data) => {
  try {
    return client.query(Create(Collection(collection), { data }));
  } catch (error) {
    console.error(error);
  }
};

exports.update = (collection, id, data) => {
  try {
    return client.query(Update(Ref(Collection(collection), id), { data }));
  } catch (error) {
    console.error(error);
  }
};

exports.remove = (collection, id) => {
  try {
    return client.query(Delete(Ref(Collection(collection), id)));
  } catch (error) {
    console.error(error);
  }
};

exports.getRefsByIndexAndValues = (indexName, ...values) => {
  try {
    return client.query(Paginate(Match(Index(indexName), ...values)));
  } catch (error) {
    console.error(error);
  }
};

exports.getFirstRefByIndexAndValues = (indexName, ...values) => {
  try {
    return client.query(Get(Match(Index(indexName), ...values)));
  } catch (error) {
    console.error(error);
  }
};
