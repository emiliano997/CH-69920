import { userModel } from "../../models/user.model.js";

export class UserService {
  async createUser(user) {
    try {
      const newUser = await userModel.create(user);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async getUsers() {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const user = await userModel.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }
}

// export default new UserService();
export const userService = new UserService();
