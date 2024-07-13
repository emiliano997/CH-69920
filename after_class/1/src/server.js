import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import sessionRoutes from "./routes/session.routes.js";
import userRoutes from "./routes/user.routes.js";
import { authenticate } from "./middlewares/auth.middleware.js";

const app = express();
const PORT = 5000;

// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

// Mongo config
mongoose
  .connect("mongodb://localhost:27017/after_class")
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

// Routes
app.use("/api/session", sessionRoutes);
app.use("/api/users", authenticate, userRoutes); // Toda la ruta protegida

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
