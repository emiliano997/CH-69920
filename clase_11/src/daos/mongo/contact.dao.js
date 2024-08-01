import { contactModel } from "../../models/contact.model.js";

export class ContactDaoMongo {
  async getContacts() {
    try {
      const contacts = await contactModel.find();
      return contacts;
    } catch (error) {
      throw error;
    }
  }

  async getContactById(id) {
    try {
      const contact = await contactModel.findById(id);
      return contact;
    } catch (error) {
      throw error;
    }
  }

  async createContact(contact) {
    try {
      const newContact = await contactModel.create(contact);
      return newContact;
    } catch (error) {
      throw error;
    }
  }
}
