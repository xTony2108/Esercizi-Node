const express = require("express");
const app = express.Router();

/**
 * @path /api/planets
 */

app.use("/planets", require("./Routes/planets"));

module.exports = app;
