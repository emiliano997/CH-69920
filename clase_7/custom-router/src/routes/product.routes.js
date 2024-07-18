import CustomRouter from "./router";

class ProductRouter extends CustomRouter {
  init() {
    this.get("/", ["USER"], this.getProducts);
  }

  getProducts(req, res) {
    res.sendSuccess({
      message: "Hola mundo",
    });
  }
}

export default new ProductRouter();
