import { Request, Response } from "express";

require("dotenv").config();

const express = require("express");
require("express-async-errors");

const morgan = require("morgan");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //3) app.use accetta json dal client
app.use(morgan("dev")); // 4) app.use logga la req del client

type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
]; // 2) Dummy database

const { SERVER_PORT } = process.env; //1) Porta specificata tramite dotenv

app.get("/", async (_: Request, res: Response) => {
  // Non ho inserito trycatch per via di express-async-errors

  return res.status(200).json({ msg: "Ciao" });
});

app.listen(SERVER_PORT, () => {
  console.log(`Server up and running on port ${SERVER_PORT}`);
});
