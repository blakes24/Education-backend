"use strict";

/** Middleware to handle common auth in routes. */
const ExpressError = require("../expressError");
const { verifyToken } = require("../helpers");

/** Middleware to authenticate user. */

function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (!authHeader) throw new ExpressError("Missing token", 401);

    const token = authHeader.replace(/^[Bb]earer /, "").trim();
    res.locals.user = verifyToken(token);

    return next();
  } catch (err) {
    return next(err);
  }
}

/** Middleware to ensure user is admin. */

function ensureAdmin(req, res, next) {
  try {
    if (!res.locals.user || !res.locals.user.isAdmin) {
      throw new ExpressError("Not authorized", 403);
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  authenticateJWT,
  ensureAdmin,
};
