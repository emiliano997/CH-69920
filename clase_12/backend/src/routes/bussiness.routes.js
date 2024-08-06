import { Router } from "express";
import { bussinessController } from "../controllers/bussiness.controller.js";

const router = Router();

router.get("/", bussinessController.getAll);
router.get("/:id", bussinessController.getById);
router.post("/", bussinessController.create);
router.post("/:id/products", bussinessController.addProduct);

export default router;
