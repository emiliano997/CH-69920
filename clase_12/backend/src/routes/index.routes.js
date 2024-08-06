import { Router } from "express";
import userRoutes from "./user.routes.js";
import orderRoutes from "./order.routes.js";
import bussinessRoutes from "./bussiness.routes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/orders", orderRoutes);
router.use("/bussiness", bussinessRoutes);

export default router;
