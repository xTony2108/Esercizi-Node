const express = require("express");
const app = express.Router();

const Joi = require("joi");

let planets = require("../../db");

/**
 * @path /api/planets
 */

app.get("/", async (_, res) => {
  return res.status(200).json({ planets });
});

/**
 * @path /api/planets/:id
 */

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const planet = planets.find((planet) => planet.id === Number(id));

  if (!planet) {
    return res.status(404).json({ msg: "Pianeta non trovato" });
  }

  return res.status(200).json({ planet });
});

/**
 * @path /api/planets
 */

app.post("/", async (req, res) => {
  const { id, name } = req.body;
  const schema = Joi.object().keys({
    id: Joi.number().required(),
    name: Joi.string().required(),
  });
  const newPlanet = await schema.validateAsync(req.body);

  const planet = planets.find(
    (planet) => planet.id === Number(id) || planet.name === name
  );

  if (planet) {
    return res.status(400).json({ msg: "Pianeta già esistente" });
  }

  planets = [...planets, newPlanet];

  return res.status(201).json({ msg: "Pianeta creato con successo." });
});

/**
 * @path /api/planets/:id
 */

app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const schema = Joi.object().keys({
    name: Joi.string().required(),
  });

  await schema.validateAsync(req.body);

  const planet = planets.find((planet) => planet.id === Number(id));

  if (!planet) {
    return res
      .status(404)
      .json({ msg: "Nessun pianeta associato a questo id" });
  }

  planets = planets.map((planet) =>
    planet.id === Number(id) ? { ...planet, name } : planet
  );

  console.log(planets);

  return res.status(200).json({ msg: "Pianeta aggiornato con successo" });
});

/**
 * @path /api/planets/:id
 */

app.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const planet = planets.find((planet) => planet.id === Number(id));

  if (!planet) {
    return res
      .status(404)
      .json({ msg: "Nessun pianeta associato a questo id" });
  }

  planets = planets.filter((planet) => planet.id !== Number(id));

  console.log(planets);

  return res.status(200).json({ msg: "Pianeta eliminato con successo" });
});

module.exports = app;
