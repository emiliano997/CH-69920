import { Router } from "express";
import { userModel } from "../models/user.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los usuarios", details: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener el usuario", details: error.message });
  }
});

export default router;
