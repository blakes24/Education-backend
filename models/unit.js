'use strict';

const db = require('../db');

/** Methods for units. */

class Unit {
  /** Create a unit.
   *
   * data should be { subjectId, number, title, startDate, endDate, reviewDate }
   *
   * date format: yyyy-mm-dd (for startDate, endDate, reviewDate )
   *
   * Returns unit
   *
   * */

  static async create({
    subjectId,
    number,
    title,
    startDate,
    endDate,
    reviewDate,
  }) {
    const result = await db.query(
      `INSERT INTO units
           (subject_id, number, title, start_date, end_date, review_date)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING
            id,
            subject_id AS "subjectId",
            number,
            title,
            start_date AS "startDate",
            end_date AS "endDate",
            review_date AS "reviewDate",
            details,
            completed`,
      [subjectId, number, title, startDate, endDate, reviewDate]
    );
    const unit = result.rows[0];

    return unit;
  }
}

module.exports = Unit;