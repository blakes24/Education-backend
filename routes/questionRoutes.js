"use strict";

/** Routes for questions. */

const express = require("express");
const Question = require("../models/question");

const router = new express.Router();

/** GET /questions/:subjectId
 *
 * returns a set of questions
 */

router.get("/:subjectId", async function (req, res, next) {
  try {
    const questions = await Question.getBySubject(+req.params.subjectId);
    return res.status(200).json(questions);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
