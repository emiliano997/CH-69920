import express from "express";
import { config } from "./config/config.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

app.listen(config.port, () => {
  console.log(`Servidor corriendo en el puerto ${config.port}`);
});
