import express from "express";
import { config } from "./config/config.js";

const app = express();

app.get("/", (req, res) => {
  res.send(
    `Servidor corriendo en ${config.ENVIRONMENT} en el puerto ${config.PORT}`
  );
});

app.listen(config.PORT, () => {
  console.log(
    `Servidor corriendo en ${config.ENVIRONMENT} en el puerto ${config.PORT}`
  );
});
