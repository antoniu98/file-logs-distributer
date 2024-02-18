const fs = require("fs");
require("dotenv").config();

const INPUT_FILE = process.env.INPUT_FILE;
const OUTPUT_FILE = process.env.OUTPUT_FILE;

const waitFor = (ms) => new Promise((r) => setTimeout(r, ms));

const getLastLine = () => {
  const fileContent = fs.readFileSync(INPUT_FILE, "utf-8");
  const lines = fileContent.split("\n");
  const lastEntry = lines[lines.length - 2];

  return lastEntry;
};

const appendToFile = (entries) => {
  try {
    if (!entries.length || entries.length === 0) {
      console.log(" 0️⃣ No entries to append to file");
      return;
    }
    console.log(` 🟩 Appending ${entries.length} entries to the file.`);
    fs.appendFileSync(OUTPUT_FILE, entries.join("\n"));
  } catch (e) {
    console.error(" 🟥 Error appending to file: ", e);
  }
};

const runFnsEvery = (ms, ...fns) => {
  while (true) {
    fns.reduce((prev, fn) => {
      return fn(prev);
    }, {});
    waitFor(ms);
  }
};

module.exports = {
  waitFor,
  appendToFile,
  getLastLine,
  runFnsEvery,
};
