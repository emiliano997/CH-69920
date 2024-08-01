import { ContactRepository } from "./contact.repository.js";
import { contactDao } from "../daos/index.js";

const contactRepository = new ContactRepository(contactDao);

export { contactRepository };
