const { getLastLine, waitFor } = require("../commons/SystemUtil");
const {
  connectClient,
  getCollection,
  addToCollection,
  closeClient,
} = require("../commons/MongoClient");

const FREQ = process.env.WRITE_FREQ_MINUTES || 1;
const DURATION = FREQ * 60 * 1000;
console.log(`📚 Writer will write every ${FREQ} minutes`);

const main = async () => {
  if (process.argv.length < 3) {
    console.log("🟥 Please provide an ID for the running writer (ex: 'npm run writer 1'). The ID is associated with the entry in the MongoDB collection.");
    process.exit(1);
  }

  const entry_id = process.argv[2];
  console.log(`📝 Writer will write to the MongoDB collection using _ID: ${entry_id}`);
  let client;
  try {
    client = await connectClient();
    const collection = getCollection(client);

    while (true) {
      const lastLine = getLastLine();
      addToCollection(entry_id, lastLine, collection);
      await waitFor(DURATION);
    }
  } catch (e) {
    console.log("🟥 Error in main: ", e);
  } finally {
    await closeClient(client);
  }
};
main();
