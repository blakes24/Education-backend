"use strict";

const jwt = require("jsonwebtoken");
const axios = require("axios");
const { SECRET_KEY, API_KEY } = require("./config");
const ExpressError = require("./expressError");

/** return JWT with userId and admin. */

function createToken(user) {
  let payload = {
    userId: user.id,
    admin: user.admin,
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
}

/** return payload if token is verified. */

function verifyToken(token) {
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    return payload;
  } catch (err) {
    throw new ExpressError("Invalid token", 401);
  }
}

/** get standards for a subject based on standards code  */
async function fetchStandards(code) {
  try {
    const resp = await axios.get(
      `https://api.commonstandardsproject.com/api/v1/standard_sets/${code}`,
      { headers: { "Api-Key": API_KEY } }
    );
    const standards = resp.data.data.standards;
    if (!standards) throw new ExpressError("Standards not found", 404);
    return Object.values(standards);
  } catch (err) {
    console.error(err);
    throw new ExpressError(err.message, err.status || 500);
  }
}

module.exports = { createToken, verifyToken, fetchStandards };
