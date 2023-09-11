const express = require("express");
const app = express.Router();
const authorize = require("../../middleware/authorize");
require("../../passport/passport");

const { login, signup, logout } = require("../../controllers/users");

app.post("/signup", signup);

app.post("/login", login);

app.get("/logout", authorize, logout);

module.exports = app;
