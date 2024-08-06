import { bussinessService } from "../services/bussiness.service.js";

class BussinessController {
  async getAll(req, res) {
    try {
      const bussinesses = await bussinessService.getAll();
      res.status(200).json(bussinesses);
    } catch (error) {
      res.status(500).json({
        error: "Error al obtener los bussiness",
        details: error.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;

      const bussiness = await bussinessService.getById(id);

      if (!bussiness) {
        return res.status(404).json({
          error: "Bussiness no encontrado",
        });
      }

      res.status(200).json(bussiness);
    } catch (error) {
      res.status(500).json({
        error: "Error al obtener el bussiness",
        details: error.message,
      });
    }
  }

  async create(req, res) {
    try {
      const { name, products } = req.body;

      if (!name) {
        return res.status(400).json({
          error: "Falta nombre",
        });
      }

      const bussiness = await bussinessService.create({
        name,
        products,
      });

      res.status(201).json(bussiness);
    } catch (error) {
      res.status(500).json({
        error: "Error al crear el bussiness",
        details: error,
      });
    }
  }

  async addProduct(req, res) {
    try {
      const { id } = req.params;

      const { productId, name, price } = req.body;

      if (!productId || !name || !price) {
        return res.status(400).json({
          error: "Falta información",
        });
      }

      const bussiness = await bussinessService.getById(id);

      if (!bussiness) {
        return res.status(404).json({
          error: "Bussiness no encontrado",
        });
      }

      bussiness.products.push({
        id: productId,
        name,
        price,
      });

      const updatedBussiness = await bussinessService.update(id, bussiness);

      res.status(200).json(updatedBussiness);
    } catch (error) {
      res.status(500).json({
        error: "Error al actualizar el bussiness",
        details: error,
      });
    }
  }
}

export const bussinessController = new BussinessController();
