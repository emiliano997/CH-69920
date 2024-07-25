import { userService } from "../services/index.js";

class UserController {
  async createUser(req, res) {
    try {
      const { name, email, age } = req.body;

      if (!name || !email || !age) {
        return res.status(400).json({
          error: "Falta información",
        });
      }

      const user = await userService.createUser({
        name,
        email,
        age,
      });

      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({
        error: "Error al crear el usuario",
      });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await userService.getUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({
        error: "Error al obtener los usuarios",
      });
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await userService.getUserById(id);

      if (!user) {
        return res.status(404).json({
          error: "Usuario no encontrado",
        });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({
        error: "Error al obtener el usuario",
      });
    }
  }
}

export const userController = new UserController();
