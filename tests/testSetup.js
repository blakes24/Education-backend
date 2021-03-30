"use strict";

const db = require("../db.js");
const fs = require("fs");
const path = require("path");
const { SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken");

const testJwt = jwt.sign({ userId: 1, admin: false }, SECRET_KEY);
const adminJwt = jwt.sign({ userId: 4, admin: true }, SECRET_KEY);
const badJwt = jwt.sign({ userId: 2, admin: false }, "wrong");

const testData = fs
  .readFileSync(path.resolve(__dirname, "./testData.sql"))
  .toString();

async function seedDatabase() {
  await db.query(testData);
}

async function beginTransaction() {
  await db.query("BEGIN");
}

async function rollbackTransaction() {
  await db.query("ROLLBACK");
}

async function endTransaction() {
  await db.end();
}

module.exports = {
  seedDatabase,
  beginTransaction,
  rollbackTransaction,
  endTransaction,
  testJwt,
  badJwt,
  adminJwt,
};
