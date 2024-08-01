import { contactRepository } from "../repository/index.js";

class ContactController {
  async getContacts(req, res) {
    try {
      const contacts = await contactRepository.getContacts();

      res.json(contacts);
    } catch (error) {
      res.status(500).json({
        error: "Error al obtener los contactos",
      });
    }
  }

  async getContactById(req, res) {
    try {
      const { id } = req.params;
      const contact = await contactRepository.getContactById(id);

      if (!contact) {
        return res.status(404).json({
          error: "Contacto no encontrado",
        });
      }

      res.json(contact);
    } catch (error) {
      res.status(500).json({
        error: "Error al obtener el contacto",
      });
    }
  }

  async createContact(req, res) {
    try {
      const newContact = await contactRepository.createContact(req.body);

      res.status(201).json(newContact);
    } catch (error) {
      res.status(500).json({
        error: "Error al crear el contacto",
      });
    }
  }
}

export const contactController = new ContactController();
