import { Router } from "express";
import userRoutes from "./user.routes.js";
import toyRoutes from "./toy.routes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/toys", toyRoutes);

export default router;
