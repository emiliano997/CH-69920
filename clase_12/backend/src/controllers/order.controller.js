import { orderService } from "../services/order.service.js";
import { userService } from "../services/user.service.js";
import { bussinessService } from "../services/bussiness.service.js";

class OrderController {
  async getAll(req, res) {
    try {
      const orders = await orderService.getAll();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({
        error: "Error al obtener los orders",
        details: error.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;

      const order = await orderService.getById(id);

      if (!order) {
        return res.status(404).json({
          error: "Order no encontrado",
        });
      }

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({
        error: "Error al obtener el order",
        details: error.message,
      });
    }
  }

  async create(req, res) {
    const {
      user: userId,
      bussiness: bussinessId,
      products: productsIds,
    } = req.body;

    if (!userId || !bussinessId || !productsIds) {
      return res.status(400).json({
        error: "Falta información",
      });
    }

    try {
      const user = await userService.getById(userId);

      if (!user) {
        return res.status(404).json({
          error: "User no encontrado",
        });
      }

      const bussiness = await bussinessService.getById(bussinessId);

      if (!bussiness) {
        return res.status(404).json({
          error: "Bussiness no encontrado",
        });
      }

      const products = bussiness.products.filter((product) =>
        productsIds.includes(product.id)
      );

      if (products.length !== productsIds.length) {
        return res.status(400).json({
          error: "Falta algun producto",
        });
      }

      const totalPrice = products.reduce((acc, curr) => acc + curr.price, 0);

      const orderNumber = await orderService.getOrderNumber();

      const order = await orderService.create({
        number: orderNumber,
        bussiness: bussinessId,
        user: userId,
        products,
        totalPrice,
      });

      user.orders.push(order._id);

      await userService.update(userId, user);

      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({
        error: "Error al crear el order",
        details: error,
      });
    }
  }

  async resolve(req, res) {
    const { resolve } = req.body;
    const { id } = req.params;

    const order = await orderService.getById(id);

    if (!order) {
      return res.status(404).json({
        error: "Order no encontrado",
      });
    }

    try {
      if (order.status === "pending") {
        order.status = resolve;
        const updatedOrder = await orderService.update(id, order);

        res.status(200).json(updatedOrder);
      } else {
        return res.status(400).json({
          error: "El pedido no puede ser actualizado",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: "Error al actualizar el order",
        details: error,
      });
    }
  }
}

export const orderController = new OrderController();
