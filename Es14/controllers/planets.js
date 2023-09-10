//Esercizio a riga 107

const Joi = require("joi");
const { db } = require("../db");

const getAll = async (_, res) => {
  try {
    const planets = await db.many(`SELECT * FROM planets`);
    return res.status(200).json(planets);
  } catch (error) {
    if (error.name === "QueryResultError") {
      //Utilizzo if error.name qualora fosse un errore del db perchè mi è sembrato di capire che non esiste un'istanza dell'errore con pg
      return res.status(404).json({ message: "Nessun pianeta trovato" });
    } else return res.status(500).json(error);
  }
};

const getOneById = async (req, res) => {
  const { id } = req.params;
  try {
    const planet = await db.one(
      `SELECT * FROM planets WHERE id=$1`,
      Number(id)
    );

    return res.status(200).json(planet);
  } catch (error) {
    if (error.name === "QueryResultError") {
      return res.status(500).json({ message: "Pianeta non trovato" });
    } else return res.status(500).json(error);
  }
};

const create = async (req, res) => {
  const { name } = req.body;
  try {
    const schema = Joi.object().keys({
      name: Joi.string()
        .required()
        .messages({ "any.required": "Name is required" }),
    });
    await schema.validateAsync(req.body);

    await db.none(`INSERT INTO planets (name) VALUES ($1)`, name);

    return res.status(201).json({ message: "Pianeta creato con successo." });
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      //Joi error
      return res.status(500).json({ message: error.details[0].message });
    } else if (error.name === "QueryResultError") {
      //DB error
      return res.status(404).json({ message: error.message });
    } else return res.status(500).json(error); // Generic error
  }
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const schema = Joi.object().keys({
    name: Joi.string().required(),
  });

  try {
    await schema.validateAsync(req.body);

    const result = await db.result(`UPDATE planets SET name=$2 WHERE id=$1`, [
      Number(id),
      name,
    ]);

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Nessun pianeta associato all'id specificato" });
    }

    return res.status(200).json({ msg: "Pianeta aggiornato con successo" });
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      return res.status(500).json({ message: error.details[0].message });
    } else return res.status(500).json(error);
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletePlanet = await db.result(
      `DELETE FROM planets WHERE id=$1`,
      Number(id)
    );

    if (deletePlanet.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Nessun pianeta associato all'id specificato" });
    }

    return res.status(200).json({ msg: "Pianeta eliminato con successo" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

/**
 * Configurazione multer in api/Routes/planets.js
 */

// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./Es14/uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage });

// app.post("/:id/image", upload.single("image"), updateImage);

const updateImage = async (req, res) => {
  const { path } = req.file;
  const { id } = req.params;
  const newPath = path.replace(/\\/g, "/"); //Ho dovuto utilizzare il replace perchè il path con postman era \\ invece di /
  try {
    const result = await db.result("UPDATE planets SET image=$2 WHERE id=$1", [
      id,
      newPath,
    ]);

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Nessun pianeta corrisponde a questo id" });
    }

    return res.status(201).json({ message: "Immagine caricata con successo" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
  updateImage,
};
