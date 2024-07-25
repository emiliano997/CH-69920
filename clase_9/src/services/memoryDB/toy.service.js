const toys = [];

export class ToyService {
  async createToy(toy) {
    try {
      const newToy = toys.push(toy);
      return newToy;
    } catch (error) {
      throw error;
    }
  }

  async getToys() {
    try {
      return toys;
    } catch (error) {
      throw error;
    }
  }
}
