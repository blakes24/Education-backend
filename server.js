"use strict";

/** Server for education. */
const { PORT } = require("./config");
const app = require("./app");

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`);
});
