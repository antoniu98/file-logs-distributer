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
  let client;
  try {
    client = await connectClient();
    const collection = getCollection(client);

    while (true) {
      const lastLine = getLastLine();
      addToCollection(lastLine, collection);
      await waitFor(DURATION);
    }
  } catch (e) {
    console.log("🟥 Error in main: ", e);
  } finally {
    await closeClient(client);
  }
};
main();
