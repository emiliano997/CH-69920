import { Router } from "express";

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
  get(path, ...callbacks) {
    this.router.get(
      path,
      this.getCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  post(path, ...callbacks) {
    this.router.get(
      path,
      this.getCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  put(path, ...callbacks) {
    this.router.get(
      path,
      this.getCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  delete(path, ...callbacks) {
    this.router.get(
      path,
      this.getCustomResponses,
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
}

export default CustomRouter;
