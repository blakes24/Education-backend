"use strict";

const db = require("../db");
const ExpressError = require("../expressError");

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

  /** Update a unit.
   *
   * data should be {startDate, endDate, reviewDate, completed, details}, id
   *
   * Returns unit
   *
   * */

  static async update(
    { startDate, endDate, reviewDate, completed, details },
    id
  ) {
    const result = await db.query(
      `UPDATE units
           SET start_date=$1, end_date=$2, review_date=$3, completed=$4, details=$5
           WHERE id=$6
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
      [startDate, endDate, reviewDate, completed, details, id]
    );
    const unit = result.rows[0];

    if (!unit) throw new ExpressError("Unit not found", 404);

    return unit;
  }
}

module.exports = Unit;
