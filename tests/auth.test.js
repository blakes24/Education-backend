"use strict";

const jwt = require("jsonwebtoken");
const { authenticateJWT, ensureAdmin } = require("../middleware/auth");

const { SECRET_KEY } = require("../config");
const testJwt = jwt.sign({ userId: 1, isAdmin: false }, SECRET_KEY);
const badJwt = jwt.sign({ userId: 2, isAdmin: false }, "wrong");

describe("authenticateJWT", function () {
  test("works: via header", function () {
    expect.assertions(2);
    const req = { headers: { authorization: `Bearer ${testJwt}` } };
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({
      user: {
        iat: expect.any(Number),
        userId: 1,
        isAdmin: false,
      },
    });
  });

  test("unauth if no header", function () {
    expect.assertions(1);
    const req = {};
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeTruthy();
    };
    authenticateJWT(req, res, next);
  });

  test("unauth if invalid token", function () {
    expect.assertions(1);
    const req = { headers: { authorization: `Bearer ${badJwt}` } };
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeTruthy();
    };
    authenticateJWT(req, res, next);
  });
});

describe("ensureAdmin", function () {
  test("works", function () {
    expect.assertions(1);
    const req = {};
    const res = { locals: { user: { userId: 1, isAdmin: true } } };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    ensureAdmin(req, res, next);
  });

  test("unauth if not admin", function () {
    expect.assertions(1);
    const req = {};
    const res = { locals: { user: { userId: 1, isAdmin: false } } };
    const next = function (err) {
      expect(err).toBeTruthy();
    };
    ensureAdmin(req, res, next);
  });
});
