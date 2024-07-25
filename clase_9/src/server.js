import express from "express";
import mongoose from "mongoose";
import indexRoutes from "./routers/index.js";
import { config } from "./config/config.js";

const app = express();
const PORT = config.PORT;

// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mongoose config
if (config.PERSISTANCE !== "memory") {
  mongoose
    .connect(config.MONGO_URI)
    .then(() => console.log("Conectado a MongoDB"))
    .catch((error) => console.log(error));
}

// Routes
app.use("/api", indexRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
