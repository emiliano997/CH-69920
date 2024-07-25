import { toyModel } from "../../models/toy.model.js";

export class ToyService {
  async createToy(toy) {
    try {
      const newToy = await toyModel.create(toy);
      return newToy;
    } catch (error) {
      throw error;
    }
  }

  async getToys() {
    try {
      const toys = await toyModel.find();
      return toys;
    } catch (error) {
      throw error;
    }
  }

  async getToyById(id) {
    try {
      const toy = await toyModel.findById(id);
      return toy;
    } catch (error) {
      throw error;
    }
  }
}
