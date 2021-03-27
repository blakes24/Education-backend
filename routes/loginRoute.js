"use strict";

/** Routes for units. */

const express = require("express");
const ExpressError = require("../expressError");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const { createToken } = require("../helpers");

const router = new express.Router();

/** POST /login:  { email, password } => { token, user } */
router.post(
  "/",
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

module.exports = router;
