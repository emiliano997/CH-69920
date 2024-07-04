import { Router } from "express";
import { userModel } from "../models/user.model.js";
import { comparePassword, createHash } from "../utils/hashFunctions.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Falta el email o la contraseña" });
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  if (!comparePassword(password, user.password)) {
    return res.status(401).json({ error: "Contraseña incorrecta" });
  }

  // Se  guarda en la colección de usuarios
  req.session.user = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    age: user.age,
  };

  // res.json({ message: "Sesión iniciada" });
  res.redirect("/profile");
});

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  if (!first_name || !last_name || !email || !age || !password) {
    return res.status(400).json({ error: "Falta información" });
  }

  // Hashear contraseña
  const hashPassword = createHash(password);

  // Se  guarda en la colección de usuarios
  const user = await userModel.create({
    first_name,
    last_name,
    email,
    age,
    password: hashPassword,
  });

  // Se guarda el usuario en la sesión
  req.session.user = {
    first_name,
    last_name,
    email,
    age,
  };

  res.json({ message: "Usuario creado", user });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Sesión cerrada" });
});

router.post("/restore-password", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Falta el email o la contraseña" });
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  try {
    // Hashear contraseña
    const hashPassword = createHash(password);

    await userModel.updateOne({ email }, { password: hashPassword });

    res.json({ message: "Contraseña cambiada" });
  } catch (error) {
    res.status(500).json({ error: "Error al cambiar la contraseña" });
  }
});

export default router;
