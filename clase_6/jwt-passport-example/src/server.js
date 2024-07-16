import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import { initializePassport } from "./config/passport.config.js";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 5000;

// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
initializePassport();
app.use(passport.initialize());

// Routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@example.com" && password === "123") {
    const token = jwt.sign({ email }, "s3cr3t", {
      expiresIn: "5m",
    });
    // res.json({ message: "Login exitoso", token });
    // res.cookie("token", token, { maxAge: 100000 });
    res.cookie("access_token", token, { maxAge: 100000, httpOnly: true });
    res.json({ message: "Login exitoso" });
  }

  res.status(401).json({ message: "Usuario o contraseña incorrectos" });
});

app.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "Bienvenido", user: req.user });
  }
);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
