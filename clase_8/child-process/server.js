import express from "express";
import { fork } from "child_process";
import { calculo } from "./calculo.js";
import path from "path";

const app = express();

let visita = 0;

app.get("/", (req, res) => {
  visita++;
  res.send(`Visitas: ${visita}`);
});

app.get("/bloqueante", (req, res) => {
  const sum = calculo();
  res.send(`Suma: ${sum}`);
});

app.get("/no-bloqueante", (req, res) => {
  const child = fork(path.join(process.cwd(), "calculo.js"));

  child.on("message", (message) => {
    console.log(`Suma: ${message}`);
    res.send(`Suma: ${message}`);
  });
});
