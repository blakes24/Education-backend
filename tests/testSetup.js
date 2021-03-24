const db = require("../db.js");
var fs = require("fs");
const path = require("path");

const testData = fs
  .readFileSync(path.resolve(__dirname, "./testData.sql"))
  .toString();

async function commonBeforeAll() {
  await db.query(testData);
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};
