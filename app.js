/** Express app for education. */

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(cors());

//logging
app.use(morgan("dev"));

module.exports = app;
