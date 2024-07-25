import { toyService } from "../services/index.js";

class ToyController {
  async createToy(req, res) {
    try {
      const { name, price, description } = req.body;

      if (!name || !price || !description) {
        return res.status(400).json({
          error: "Falta información",
        });
      }

      const toy = await toyService.createToy({
        name,
        price,
        description,
      });

      res.status(201).json(toy);
    } catch (error) {
      res.status(500).json({
        error: "Error al crear el toy",
      });
    }
  }

  async getToys(req, res) {
    try {
      const toys = await toyService.getToys();

      res.json(toys);
    } catch (error) {
      res.status(500).json({
        error: "Error al obtener los toys",
      });
    }
  }

  async getToyById(req, res) {
    try {
      const { id } = req.params;

      const toy = await toyService.getToyById(id);

      if (!toy) {
        return res.status(404).json({
          error: "Toy no encontrado",
        });
      }

      res.json(toy);
    } catch (error) {
      res.status(500).json({
        error: "Error al obtener el toy",
      });
    }
  }
}

export const toyController = new ToyController();
