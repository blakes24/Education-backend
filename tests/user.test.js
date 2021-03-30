"use strict";

const db = require("../db.js");
const User = require("../models/user.js");
const {
  seedDatabase,
  beginTransaction,
  rollbackTransaction,
  endTransaction,
} = require("./testSetup");

beforeAll(seedDatabase);
beforeEach(beginTransaction);
afterEach(rollbackTransaction);
afterAll(endTransaction);

/************************************** authenticate */

describe("authenticate", function () {
  test("works", async function () {
    const user = await User.authenticate("teacher1@school.edu", "teacher1pw");
    expect(user).toEqual({
      id: 1,
      firstName: "Carl",
      lastName: "Smith",
      email: "teacher1@school.edu",
      schoolId: 1,
      admin: false,
    });
  });

  test("unauth if no such user", async function () {
    try {
      await User.authenticate("nope", "password");
    } catch (err) {
      expect(err.status).toEqual(401);
    }
  });

  test("unauth if wrong password", async function () {
    try {
      await User.authenticate("teacher1@school.edu", "wrong");
    } catch (err) {
      expect(err.status).toEqual(401);
    }
  });
});

describe("getSubjects", function () {
  test("works", async function () {
    const subjects = await User.getSubjects(1);
    expect(subjects.length).toEqual(3);
    expect(subjects[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        grade: expect.any(String),
        units: expect.any(Array)
      })
    );
  });

  test("404 if user does not exist", async function () {
    try {
      await await User.getSubjects(99);
    } catch (err) {
      expect(err.status).toEqual(404);
    }
  });

  test("404 if user has no subjects", async function () {
    try {
      await await User.getSubjects(5);
    } catch (err) {
      expect(err.status).toEqual(404);
    }
  });
});
