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
 * @path /api/planets/allPlanets
 */

app.get("/allPlanets", getAll);

/**
 * @path /api/planets/:id
 */

app.get("/:id", getOneById);

/**
 * @path /api/planets/create
 */

app.post("/create", create);

/**
 * @path /api/planets/:id
 */

app.put("/:id", updateById);

/**
 * @path /api/planets/:id
 */

app.delete("/:id", deleteById);

module.exports = app;
