import express from "express";
import mongoose from "mongoose";
import routes from "./routes/index.routes.js";

const app = express();
const PORT = 5000;

// Express configuración
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);

mongoose
  .connect("mongodb://localhost:27017/db_clase_0")
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
