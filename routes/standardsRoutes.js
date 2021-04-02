"use strict";

/** Routes for units. */

const express = require("express");

const { fetchStandards } = require("../helpers");

const router = new express.Router();

/** GET /standards/:code
 *
 * returns standards array
 */

router.get("/:code", async function (req, res, next) {
  try {
    const standards = await fetchStandards(req.params.code);
    return res.status(200).json(standards);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
