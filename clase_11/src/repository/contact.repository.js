export class ContactRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getContacts() {
    return await this.dao.getContacts();
  }

  async getContactById(id) {
    return await this.dao.getContactById(id);
  }

  async createContact(contact) {
    return await this.dao.createContact(contact);
  }
}
