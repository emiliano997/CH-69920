import CustomRouter from "./router.js";

class UserRouter extends CustomRouter {
  init() {
    this.get("/", this.getUsers);
    this.get("/error", ["USER_PREMIUM"], this.getError);
  }

  getUsers(req, res) {
    // res.json({
    //   message: "Hola mundo",
    // });

    res.sendSuccess({
      message: "Hola mundo",
    });
  }

  getError(req, res) {
    throw new Error("Error al obtener los usuarios");
  }
}

export default new UserRouter();
