import { Router } from "express";
import { orderController } from "../controllers/order.controller.js";

const router = Router();

router.get("/", orderController.getAll);
router.get("/:id", orderController.getById);
router.post("/", orderController.create);
router.post("/:id/resolve", orderController.resolve);

export default router;
