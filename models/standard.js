"use strict";

const db = require("../db");
const ExpressError = require("../expressError");

/** Methods for standards. */

class Standard {
  /** Get a standards set by id. Returns standards set. */

  static async getSet(id) {
    const result = await db.query(
      `SELECT
          code, description
      FROM
          standards
      WHERE
          standards.set_id = $1`,
      [id]
    );
    const standardsSet = result.rows;

    if (standardsSet.length === 0)
      throw new ExpressError("standards not found", 404);

    return standardsSet;
  }
}

module.exports = Standard;
