const fs = require("fs");
const { MongoClient, ServerApiVersion } = require("mongodb");

const DURATION_1_MINUTE = 60 * 1000;
const FILE_PATH = "../dummy_file.csv";
// MongoDB
const USER = "dummy_user";
const PASS = "i852DIC1FbXKN9jU";
const DB_NAME = "dummy_db";
const COLLECTION_NAME = "dummy_collection";
const MONGODB_URI = `mongodb+srv://${USER}:${PASS}@cluster0.9lmrpfh.mongodb.net/?retryWrites=true&w=majority`;

const waitFor = (ms) => new Promise((r) => setTimeout(r, ms));

const getLastLine = () => {
  const fileContent = fs.readFileSync(FILE_PATH, "utf-8");
  const lines = fileContent.split("\n");
  const lastEntry = lines[lines.length - 2];

  return lastEntry;
};

const addToCollection = (collection, entry) => {
  collection.insertOne({ entry }).then((resp) => {
    console.log(`Added ${entry} to the database with response: ${JSON.stringify(resp)}`);
  });
};

const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const collection = client.db(DB_NAME).collection(COLLECTION_NAME);
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    while (true) {
      const lastEntry = getLastLine();
      addToCollection(collection, lastEntry);
      await waitFor(DURATION_1_MINUTE);
    }
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
