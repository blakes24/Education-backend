"use strict";

/** Routes for units. */

const express = require("express");
const Standard = require("../models/standard");

const router = new express.Router();

/** GET /standards/:setId
 *
 * returns a set of standards
 */

router.get("/:setId", async function (req, res, next) {
  try {
    const standards = await Standard.getSet(+req.params.setId);
    return res.status(200).json(standards);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
