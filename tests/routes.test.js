"use strict";

const request = require("supertest");
const app = require("../app");

const {
  seedDatabase,
  beginTransaction,
  rollbackTransaction,
  endTransaction,
  testJwt,
  adminJwt,
} = require("./testSetup");

beforeAll(seedDatabase);
beforeEach(beginTransaction);
afterEach(rollbackTransaction);
afterAll(endTransaction);

const unitData = {
  subjectId: 1,
  number: 1,
  title: "Test",
  startDate: "2021-03-25",
  endDate: "2021-04-25",
  reviewDate: "2021-04-28",
};

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

/************************************** POST /unit */

describe("POST /unit", function () {
  test("works", async function () {
    const resp = await request(app)
      .post("/unit")
      .send(unitData)
      .set("authorization", `Bearer ${adminJwt}`);
    expect(resp.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        subjectId: 1,
        number: 1,
        title: "Test",
      })
    );
  });

  test("unauth with non-admin", async function () {
    const resp = await request(app)
      .post("/unit")
      .send(unitData)
      .set("authorization", `Bearer ${testJwt}`);
    expect(resp.statusCode).toEqual(403);
  });
});
