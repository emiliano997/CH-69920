import { contactController } from "../controllers/contact.controllers.js";
import { Router } from "express";
import {
  transformContact,
  validate,
  validateContact,
} from "../middleware/validation.middleware.js";
import { contactDto } from "../dtos/contact.dto.js";

const router = Router();

router.get("/", contactController.getContacts);
router.get("/:id", contactController.getContactById);
// router.post("/", validateContact, contactController.createContact);
router.post(
  "/",
  transformContact,
  validate(contactDto),
  contactController.createContact
);

export default router;
