import { userModel } from "../models/user.model.js";
import userService from "../services/mongodb/user.service.js";

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los usuarios" });
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await userModel.findById(id);

      if (!user) {
        return res.status(404).json({ error: "No se encontró el usuario" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el usuario" });
    }
  }

  async createUser(req, res) {
    try {
      const { name, age, email } = req.body;

      const user = await userService.createUser(name, age, email);

      res.json(user);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al crear el usuario", details: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, age, email } = req.body;

      const userExists = await userModel.findById(id);

      if (!userExists) {
        return res.status(404).json({ error: "No se encontró el usuario" });
      }

      const user = await userModel.findByIdAndUpdate(
        id,
        {
          name,
          age,
          email,
        },
        { new: true }
      );

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el usuario" });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const userExists = await userModel.findById(id);

      if (!userExists) {
        return res.status(404).json({ error: "No se encontró el usuario" });
      }

      const user = await userModel.findByIdAndDelete(id);

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el usuario" });
    }
  }
}

// Otra forma de exportar
// export const userController = new UserController();

export default new UserController(); // Devuelve un nuevo objeto UserController
