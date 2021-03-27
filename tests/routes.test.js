"use strict";

const request = require("supertest");
const app = require("../app");

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

/************************************** POST /login */

describe("POST /login", function () {
  test("works", async function () {
    const resp = await request(app).post("/login").send({
      email: "coach@school.edu",
      password: "coachpw",
    });
    expect(resp.body).toEqual({
      token: expect.any(String),
      user: {
        id: 4,
        firstName: "Austin",
        lastName: "Larkman",
        email: "coach@school.edu",
        schoolId: 1,
        admin: true,
      },
    });
  });

  test("unauth with non-existent user", async function () {
    const resp = await request(app).post("/login").send({
      email: "fake@email.com",
      password: "coachpw",
    });
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth with wrong password", async function () {
    const resp = await request(app).post("/login").send({
      email: "coach@school.edu",
      password: "nope",
    });
    expect(resp.statusCode).toEqual(401);
  });
});
