import contactRoutes from "./contact.routes.js";
import { Router } from "express";

const router = Router();

router.use("/contacts", contactRoutes);

export default router;
