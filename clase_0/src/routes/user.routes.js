import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { validacion } from "../middlewares/validacion.js";

const router = Router();

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.post("/", validacion, UserController.createUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export default router;
