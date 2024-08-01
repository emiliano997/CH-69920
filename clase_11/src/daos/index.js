import { config } from "../config/config.js";
import { ContactDaoMongo } from "./mongo/contact.dao.js";
import { ContactDaoMemory } from "./memory/conctact.dao.js";
import { connect } from "mongoose";

function getDao() {
  switch (config.persistance) {
    case "memory":
      return new ContactDaoMemory();
    case "mongodb":
    default:
      connect("mongodb://localhost:27017/contacts")
        .then(() => console.log("Conectado a MongoDB"))
        .catch((error) => console.log(error));
      return new ContactDaoMongo();
  }
}

export const contactDao = getDao();
