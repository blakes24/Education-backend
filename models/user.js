"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const ExpressError = require("../expressError");

/** Methods for users. */

class User {
  /** authenticate user with email, password.
   *
   * Returns user
   *
   **/

  static async authenticate(email, password) {
    // find the user
    const result = await db.query(
      `SELECT id,
              email,
              password,
              first_name AS "firstName",
              last_name AS "lastName",
              school_id AS "schoolId",
              admin
           FROM users
           WHERE email = $1`,
      [email]
    );

    const user = result.rows[0];

    if (user) {
      // compare supplied password to hashed password from db
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new ExpressError("Invalid email/password", 401);
  }

  /** Get subjects associated with a user by userId.
   *
   * Returns subjects and units
   *
   **/

  static async getSubjects(userId) {
    const result = await db.query(
      `SELECT
          s.id,
          s.name,
          s.grade,
          s.standards_code AS "standardsCode",
          COALESCE(json_agg(json_build_object('id', u.id, 'number', u.number, 'title', u.title, 'startDate', u.start_date, 'endDate', u.end_date, 'reviewDate', u.review_date, 'completed', u.completed)) FILTER (WHERE u.id IS NOT NULL), '[]') AS units
      FROM
          users_subjects AS us
          JOIN subjects AS s ON us.subject_id = s.id
          FULL JOIN units AS u ON u.subject_id = s.id
      WHERE
          us.user_id = $1
      GROUP BY
          s.id`,
      [userId]
    );

    const subjects = result.rows;

    if (subjects.length === 0) throw new ExpressError("No subjects found", 404);

    return subjects;
  }
}

module.exports = User;
