import { userModel } from "../../models/user.model.js";

class UserService {
  async getAllUsers() {
    return await userModel.find();
  }

  async createUser(name, age, email) {
    const user = new userModel({
      name,
      age,
      email,
    });

    await user.save();

    return user;
  }
}

export default new UserService();
