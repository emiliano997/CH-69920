import { mailService } from "../services/mail.service.js";
import { smsService } from "../services/sms.service.js";

// DB
const users = [];

class UserController {
  async getAll(req, res) {
    res.status(200).json(users);
  }

  async create(req, res) {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        error: "Falta información",
      });
    }

    if (users.find((user) => user.email === email)) {
      return res.status(400).json({
        error: "Email ya existe",
      });
    }

    users.push({
      name,
      email,
      phone,
    });

    // Enviar mail de bienvenida
    await mailService.sendMail({
      to: email,
      subject: "Bienvenido a nuestro servicio de mensajes masivos",
      type: "welcome",
    });

    await smsService.sendSms(
      phone,
      "Bienvenido a nuestro servicio de mensajes masivos"
    );

    res.status(201).json(users);
  }

  async activate(req, res) {
    // token = email encriptado
    const { token } = req.params;

    // Chequear que el token sea válido

    // Si el token es invalido o vence, devolver error

    // Activar el usuario
  }
}

export const userController = new UserController();
