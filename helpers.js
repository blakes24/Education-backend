const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("./config");

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
  return jwt.verify(token, SECRET_KEY);
}

module.exports = { createToken, verifyToken };
