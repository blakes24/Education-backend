"use strict";

const request = require("supertest");
const app = require("../app");
const Unit = require("../models/unit");

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

const updateData = {
  startDate: "2021-03-25",
  endDate: "2021-04-25",
  reviewDate: "2021-04-28",
  completed: true,
  details: {
    reflection: "Students learned stuff",
    objectives: ["Teach stuff"],
  },
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

/************************************** POST /units */

describe("POST /units", function () {
  test("works", async function () {
    const resp = await request(app)
      .post("/units")
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
      .post("/units")
      .send(unitData)
      .set("authorization", `Bearer ${testJwt}`);
    expect(resp.statusCode).toEqual(403);
  });
});

/************************************** PATCH /units/:id */

describe("PATCH /units", function () {
  beforeEach(async () => {
    await seedDatabase();
    await Unit.create(unitData);
  });

  test("works", async function () {
    const resp = await request(app)
      .patch("/units/1")
      .send(updateData)
      .set("authorization", `Bearer ${testJwt}`);
    expect(resp.body).toEqual(
      expect.objectContaining({
        id: 1,
        details: {
          reflection: "Students learned stuff",
          objectives: ["Teach stuff"],
        },
      })
    );
  });

  test("404 if unit does not exist", async function () {
    const resp = await request(app)
      .patch("/units/999")
      .send(updateData)
      .set("authorization", `Bearer ${testJwt}`);
    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** GET /users/:userId/subjects */

describe("GET /users/:userId/subjects", function () {
  test("works", async function () {
    const resp = await request(app)
      .get("/users/1/subjects")
      .set("authorization", `Bearer ${testJwt}`);
    expect(resp.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          grade: expect.any(String),
          units: expect.any(Array),
        }),
      ])
    );
  });

  test("unauth if wrong user", async function () {
    const resp = await request(app)
      .get("/users/2/subjects")
      .set("authorization", `Bearer ${testJwt}`);
    expect(resp.statusCode).toEqual(403);
  });
});
