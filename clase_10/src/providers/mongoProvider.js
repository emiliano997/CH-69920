import { connect } from "mongoose";

class MongoProvider {
  static instance = null;

  constructor() {
    if (!MongoProvider.instance) {
      this.connection = null;
      MongoProvider.instance = this; // this: Hace referencia a la instancia actual
    }

    return MongoProvider.instance;
  }

  async connect() {
    if (this.connection) {
      console.log("Ya está conectado");
      return this.connection;
    }

    this.connection = await connect("mongodb://localhost:27017/mongo-test");
    console.log("Conectado a MongoDB");
    return this.connection;
  }
}

const instance = new MongoProvider();

export default instance;
