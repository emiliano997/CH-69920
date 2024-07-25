const users = [];

export class UserService {
  async createUser(user) {
    try {
      const newUser = users.push(user);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async getUsers() {
    try {
      return users;
    } catch (error) {
      throw error;
    }
  }
}
