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
}

module.exports = User;
