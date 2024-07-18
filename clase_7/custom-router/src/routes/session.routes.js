import CustomRouter from "./router.js";
import jwt from "jsonwebtoken";

class SessionRouter extends CustomRouter {
  init() {
    this.get("/", ["PUBLIC"], (req, res) => {
      res.sendSuccess({
        message: "Hola mundo",
      });
    });
    this.post("/login", ["PUBLIC"], this.login);
  }

  login(req, res) {
    const { email } = req.body;

    const user = {
      email,
      role: "USER_PREMIUM",
    };

    const token = jwt.sign(user, "s3cr3t", {
      expiresIn: "5m",
    });

    res.sendSuccess({
      token,
    });
  }
}

export default new SessionRouter();
