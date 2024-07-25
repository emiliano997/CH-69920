import { Router } from "express";
import { userController } from "../controllers/user.controller.js";

const router = Router();

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);

export default router;
