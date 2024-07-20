import { Router } from "express";
import { userModel } from "../models/user.model.js";
import { createHash } from "../utils/hash.js";
import passport from "passport";
import { generateToken } from "../utils/jwt.js";

const router = Router();

router.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/api/auth/login",
  }),
  async (req, res) => {
    const payload = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      role: req.user.role,
    };

    const token = generateToken(payload);

    res.cookie("token", token, {
      maxAge: 100000,
      httpOnly: true,
    });

    res.status(200).json({
      message: "Login success",
      token,
    });
  }
);

router.get("/login", (req, res) => {
  res.status(401).json({
    error: "Unauthorized",
  });
});

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, role, password } = req.body;

  if (!first_name || !last_name || !email || !age || !password) {
    return res.status(400).json({
      error: "Missing fields",
    });
  }

  try {
    // Hashear contraseña
    const hashPassword = await createHash(password);

    const user = await userModel.create({
      first_name,
      last_name,
      email,
      age,
      password: hashPassword,
      role,
    });

    res.status(201).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear el usuario", details: error.message });
  }
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    res.status(200).json({
      message: "Bienvenido",
      user: req.user,
    });
  }
);

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Sesión cerrada",
  });
});

export default router;
