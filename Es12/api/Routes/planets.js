const express = require("express");
const app = express.Router();

const {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
} = require("../../controllers/planets");

/**
 * @path /api/planets
 */

app.get("/", getAll);

/**
 * @path /api/planets/:id
 */

app.get("/:id", getOneById);

/**
 * @path /api/planets
 */

app.post("/", create);

/**
 * @path /api/planets/:id
 */

app.put("/:id", updateById);

/**
 * @path /api/planets/:id
 */

app.delete("/:id", deleteById);

module.exports = app;
