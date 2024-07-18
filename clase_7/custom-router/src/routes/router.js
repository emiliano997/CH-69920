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
    this.router.get(path, this.applyCallbacks(callbacks));
  }

  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        console.log(error);

        // params: [req, res, next]
        params[1].status(500).json({
          error: "Hubo un error",
          details: error.message,
        });
      }
    });
  }
}

export default CustomRouter;
