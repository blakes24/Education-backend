"use strict";

const db = require("../db");
const ExpressError = require("../expressError");

/** Methods for questions. */

class Question {
  /** Get questions by subjectId. */

  static async getBySubject(subjectId) {
    // check for subject specific questions first
    const result = await db.query(
      `SELECT q.id, q.text FROM questions AS q
        JOIN questions_subjects AS qs ON q.id = qs.question_id
        WHERE qs.subject_id = $1`,
      [subjectId]
    );
    const questions = result.rows;

    // check for school questions if no subject questions are found
    if (questions.length === 0) {
      const schoolQuestions = await Question.getSchoolSet(subjectId);
      return schoolQuestions;
    }

    return questions;
  }

  /** Get questions associated with a school */

  static async getSchoolSet(subjectId) {
    const result = await db.query(
      `SELECT q.id, q.text FROM questions AS q
        JOIN questions_schools AS qs ON q.id = qs.question_id
        JOIN subjects AS s ON s.school_id = qs.school_id
        WHERE s.id = $1`,
      [subjectId]
    );
    const questions = result.rows;

    if (questions.length === 0)
      throw new ExpressError("questions not found", 404);

    return questions;
  }
}

module.exports = Question;
