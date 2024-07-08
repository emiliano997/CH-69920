import express from "express";
import mongoose from "mongoose";
import sessionRoutes from "./routes/session.routes.js";
import viewsRoutes from "./routes/views.routes.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongStore from "connect-mongo";
import path from "path";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";

// Create app
const app = express();
const PORT = 5000;

// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "s3cr3t",
    resave: false,
    saveUninitialized: false,
    store: new MongStore({
      mongoUrl: "mongodb://localhost:27017/ch69920",
      ttl: 10,
    }),
  })
);

// Mongo config
mongoose
  .connect("mongodb://localhost:27017/ch69920")
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

// Passport config
initializePassport();
app.use(passport.initialize());

// Handlebars config
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/api/sessions", sessionRoutes);
app.use("/", viewsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
