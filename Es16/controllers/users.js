const { db } = require("../db");

const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const { SECRET } = process.env;

const signup = async (req, res) => {
  const { username, password } = req.body;
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  try {
    const data = await schema.validateAsync(req.body);

    const user = await db.oneOrNone(
      `SELECT * FROM users WHERE username=$1`,
      username
    );

    if (user) {
      return res.status(400).json({ message: "Username già in uso" });
    }

    const cryptedPw = await bcrypt.hash(password, 12);

    data.password = cryptedPw;

    await db.none(`INSERT INTO users (username, password) VALUES ($1, $2)`, [
      data.username,
      data.password,
    ]);

    return res
      .status(200)
      .json({ msg: "Signup successful. Now you can log in." });
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      return res.status(500).json({ message: error.details[0].message });
    }
    return res.status(500).json({ message: error });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);

    const user = await db.oneOrNone(
      `SELECT * FROM users WHERE username=$1`,
      username
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: "I dati inseriti non corrispondono" });
    }

    const compare = await bcrypt.compare(password, user.password);

    if (!compare)
      return res
        .status(400)
        .json({ message: "I dati inseriti non corrispondono" });

    const payload = {
      id: user.id,
      username,
    };

    const signToken = jwt.sign(payload, SECRET, { expiresIn: "2h" });

    const { id, token } = await db.one(
      "UPDATE users SET token=$2 WHERE id=$1 RETURNING id, token",
      [user.id, signToken]
    );

    return res.status(200).json({ id, token, username });
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      return res.status(500).json({ message: error.details[0].message });
    }
    return res.status(500).json({ message: error });
  }
};

module.exports = { login, signup };
