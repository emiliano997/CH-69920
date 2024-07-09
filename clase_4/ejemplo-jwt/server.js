import express from "express";
import { generateToken, authToken } from "./utils.js";

const app = express();
const PORT = 5000;

// BD
const users = [];

// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      error: "Falta información",
    });
  }

  const user = {
    name,
    email,
    password,
  };

  users.push(user);
  res.json({ message: "Usuario registrado" });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Falta información",
    });
  }

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(404).json({
      error: "Usuario no encontrado",
    });
  }

  if (user.password !== password) {
    return res.status(401).json({
      error: "Contraseña incorrecta",
    });
  }

  const token = generateToken({ email: user.email });

  res.json({
    message: "Sesión iniciada",
    token,
  });
});

app.get("/profile", authToken, (req, res) => {
  res.json(req.user);
});

app.get("/users", authToken, (req, res) => {
  res.json(users);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
