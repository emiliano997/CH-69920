import { Router } from "express";
import jwt from "jsonwebtoken";

class CustomRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  // Método abstracto para inicializar el router
  init() {}

  getRouter() {
    return this.router;
  }

  // this.get("/", authMiddleware, userConteroller.getUsers);
  get(path, policies = [], ...callbacks) {
    this.router.get(
      path,
      this.getCustomResponses,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }

  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      this.getCustomResponses,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }

  put(path, policies = [], ...callbacks) {
    this.router.put(
      path,
      this.getCustomResponses,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }

  delete(path, policies, ...callbacks) {
    this.router.delete(
      path,
      this.getCustomResponses,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }

  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        console.log(error);

        // params: [req, res, next]
        params[1].sendServerError(error);
      }
    });
  }

  getCustomResponses(req, res, next) {
    // Estandarizar nuestras respuestas
    res.sendSuccess = (payload) =>
      res.status(200).json({ success: true, payload });
    res.sendServerError = (error) =>
      res.status(500).json({ success: false, details: error.message });
    res.sendUserError = (error) =>
      res.status(400).json({ success: false, details: error.message });

    next();
  }

  // Politicas de autenticación
  handlePolicies(policies = []) {
    return (req, res, next) => {
      console.log(policies);
      if (policies.includes("PUBLIC")) return next();

      const authHeaders = req.headers.authorization;

      if (!authHeaders) {
        return res.sendUserError({
          message: "No autorizado",
        });
      }

      // _ = Bearer
      // token = jwt
      const [_, token] = authHeaders.split(" "); // [0] = Bearer, [1] = jwt

      try {
        const user = jwt.verify(token, "s3cr3t");

        if (!policies.includes(user.role)) {
          return res.sendUserError({
            message: "No autorizado",
          });
        }

        req.user = user;

        return next();
      } catch (error) {
        return res.sendUserError({
          message: "No autorizado",
        });
      }
    };
  }
}

export default CustomRouter;
