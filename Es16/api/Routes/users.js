const express = require("express");
const app = express.Router();

const { login, signup } = require("../../controllers/users");

app.post("/signup", signup);

app.post("/login", login);

module.exports = app;
