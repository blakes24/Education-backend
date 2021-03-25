/** Express app for education. */

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const ExpressError = require("./expressError");
const { body, validationResult } = require("express-validator");
const User = require("./models/user");
const { createToken } = require("./helpers");

const app = express();

app.use(express.json());
app.use(cors());

//logging
app.use(morgan("dev"));

app.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 7 }),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ExpressError("Invalid email/password", 401);
      }
      const { email, password } = req.body;
      const user = await User.authenticate(email, password);
      const token = createToken(user);
      return res.json({ token, user });
    } catch (err) {
      return next(err);
    }
  }
);

/** Handle 404 errors */
app.use(function (req, res, next) {
  return next(new ExpressError("Not Found", 404));
});

/** Generic error handler */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
