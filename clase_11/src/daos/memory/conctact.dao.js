import { v4 as uuid } from "uuid";

export class ContactDaoMemory {
  constructor() {
    this.contacts = [];
  }

  async getContacts() {
    return this.contacts;
  }

  async getContactById(id) {
    return this.contacts.find((contact) => contact._id === id);
  }

  async createContact(contact) {
    contact._id = uuid();

    if (this.contacts.find((c) => c._id === contact._id)) {
      throw new Error("Contacto ya existe");
    }

    this.contacts.push(contact);
    return contact;
  }
}
