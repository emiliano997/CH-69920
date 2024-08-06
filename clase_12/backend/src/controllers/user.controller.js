import { userService } from "../services/user.service.js";

class UserController {
  async getAll(req, res) {
    try {
      const users = await userService.getAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        error: "Error al obtener los usuarios",
        details: error.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;

      const user = await userService.getById(id);

      if (!user) {
        return res.status(404).json({
          error: "User no encontrado",
        });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        error: "Error al obtener el user",
        details: error.message,
      });
    }
  }

  async create(req, res) {
    try {
      const { name, email, role } = req.body;

      if (!name || !email) {
        return res.status(400).json({
          error: "Falta información",
        });
      }

      const user = await userService.create({
        name,
        email,
        role,
      });

      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({
        error: "Error al crear el user",
        details: error,
      });
    }
  }
}

export const userController = new UserController();
