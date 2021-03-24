const db = require("../db.js");
const User = require("../models/user.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./testSetup");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

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
