const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const DB_NAME = process.env.DB_NAME;
const DB_COLLECTION_NAME = process.env.DB_COLLECTION_NAME;
const MONGODB_URI = process.env.MONGODB_URI;
const AUTHOR = process.env.AUTHOR || "Unknown";

const connectClient = async () => {
  const client = new MongoClient(MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    console.log(
      "✅ Pinged your deployment. You successfully connected to MongoDB!"
    );

    return client;
  } catch (e) {
    console.log("🟥 Error connecting to MongoDB: ", e);
    process.exit(1);
  }
};

const getCollection = (client) => {
  return client.db(DB_NAME).collection(DB_COLLECTION_NAME);
};

const closeClient = async (client) => {
  try {
    await client.close();
  } catch (e) {
    console.log("🟥 Error closing MongoDB client: ", e);
  }
};

const addToCollection = (entry_id, entry, collection) => {
  const document = { entry, dateAdded: new Date().getTime(), author: AUTHOR };
  collection.findOneAndReplace(
    { _id : entry_id },
    document,
    { upsert: true } // Insert if not found
  ).then((resp) => {
    console.log(
      `🟩 Added ${JSON.stringify(
        document
      )} to the database with response: ${JSON.stringify(resp)}`
    );
  });
};

async function getRecordsFrom5Minutes(collection) {
  const fiveMinutesAgo = new Date();
  fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);

  try {
    const query = { dateAdded: { $gte: fiveMinutesAgo.getTime() } };

    const results = await collection.find(query).toArray();
    return {
      since: fiveMinutesAgo.toISOString(),
      results: results.map((doc) => doc.entry),
    };
  } catch (e) {
    console.log(
      `🟥 Error getting records from the last 5 minutes (${fiveMinutesAgo.toISOString()}) : `,
      e
    );
  }
}

module.exports = {
  connectClient,
  getCollection,
  addToCollection,
  getRecordsFrom5Minutes,
  closeClient,
};
