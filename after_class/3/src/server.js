import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import routes from "./routes/index.js";
import { config } from "./config/config.js";

const app = express();
const PORT = 5000;

// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Passport config
initializePassport();
app.use(passport.initialize());

// Mongo config
mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

// Routes
app.use("/api", routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
