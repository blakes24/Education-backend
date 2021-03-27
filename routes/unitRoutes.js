"use strict";

/** Routes for units. */

const express = require("express");

const { ensureAdmin } = require("../middleware/auth");
const Unit = require("../models/unit");

const router = new express.Router();

/** POST / { unit } =>  { unit }
 *
 * unit should be { subjectId, number, title, startDate, endDate, reviewDate }
 *
 * Authorization required: admin
 */

router.post("/", ensureAdmin, async function (req, res, next) {
  try {
    const unit = await Unit.create(req.body);
    return res.status(201).json({ unit });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
