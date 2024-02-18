const { waitFor, appendToFile } = require("../commons/SystemUtil");
const {
  connectClient,
  getCollection,
  getRecordsFrom5Minutes,
  closeClient,
} = require("../commons/MongoClient");

const FREQ = process.env.READ_FREQ_MINUTES || 1;
const DURATION = FREQ * 60 * 1000;
console.log(`📚 Reader will read every ${FREQ} minutes`);

const main = async () => {
  let client;
  try {
    client = await connectClient();
    const collection = getCollection(client);

    while (true) {
      const { since, results } = await getRecordsFrom5Minutes(collection);
      console.log(
        `📚 Records since ${since}: ${results.map((r) => `\n\t* ${r}`)}`
      );
      appendToFile(results);
      await waitFor(DURATION);
    }
  } catch (e) {
    console.log("🟥 Error in main: ", e);
  } finally {
    await closeClient(client);
  }
};
main();
