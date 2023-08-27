"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //3) app.use accetta json dal client
app.use(morgan("dev")); // 4) app.use logga la req del client
let planets = [
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
app.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Non ho inserito trycatch per via di express-async-errors
    return res.status(200).json({ msg: "Ciao" });
}));
app.listen(SERVER_PORT, () => {
    console.log(`Server up and running on port ${SERVER_PORT}`);
});
