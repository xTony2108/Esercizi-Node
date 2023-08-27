const Joi = require("joi");

let planets = require("../db");

const getAll = async (_, res) => {
  return res.status(200).json({ planets });
};

const getOneById = async (req, res) => {
  const { id } = req.params;
  const planet = planets.find((planet) => planet.id === Number(id));

  if (!planet) {
    return res.status(404).json({ msg: "Pianeta non trovato" });
  }

  return res.status(200).json({ planet });
};

const create = async (req, res) => {
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
};

const updateById = async (req, res) => {
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
};

const deleteById = async (req, res) => {
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
};

module.exports = { getAll, getOneById, create, updateById, deleteById };
