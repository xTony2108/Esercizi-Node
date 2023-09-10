require("dotenv").config();

const express = require("express");
require("express-async-errors");

const app = express();
const morgan = require("morgan");
const db = require("./db");

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //3) app.use accetta json dal client
app.use(morgan("dev")); // 4) app.use logga la req del client

/**
 * @path /api
 */

app.use("/api", require("./api"));

db.setupDb();

const { SERVER_PORT } = process.env; //1) Porta specificata tramite dotenv

app.listen(SERVER_PORT, () => {
  console.log(`Server up and running on port ${SERVER_PORT}`);
});

module.exports = app;
