"use strict";

/** Routes for users. */

const express = require("express");

const { ensureUserOrAdmin } = require("../middleware/auth");
const User = require("../models/user");

const router = new express.Router();

/** GET /:userId/subjects
 *
 * returns a users subjects and related units
 *
 * Authorization required: admin or user same as userId in path
 */

router.get(
  "/:userId/subjects",
  ensureUserOrAdmin,
  async function (req, res, next) {
    try {
      const subjects = await User.getSubjects(+req.params.userId);
      return res.status(201).json(subjects);
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
