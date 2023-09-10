const express = require("express");
const app = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Es14/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
  updateImage,
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

/**
 * @path /api/planets/:id/image
 */

app.post("/:id/image", upload.single("image"), updateImage);

module.exports = app;
