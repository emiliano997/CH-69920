import { Router } from "express";
import { toyController } from "../controllers/toy.controller.js";

const router = Router();

router.get("/", toyController.getToys);
router.get("/:id", toyController.getToyById);
router.post("/", toyController.createToy);

export default router;
