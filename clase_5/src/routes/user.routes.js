import { Router } from "express";
import { userModel } from "../models/user.model";

const router = Router();

router.get("/", async (req, res) => {
  const users = await userModel.find();
  res.json(users);
});

router.post("/", async (req, res) => {
  const { first_name, last_name, email, role, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({
      error: "Falta información",
    });
  }

  try {
    // Hashear contraseña
    const hashPassword = await userModel.createHash(password);

    const user = await userModel.create({
      first_name,
      last_name,
      email,
      role,
      password: hashPassword,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      error: "Error al crear el usuario",
    });
  }
});

export default router;
