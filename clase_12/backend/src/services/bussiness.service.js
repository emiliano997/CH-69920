import { bussinessModel } from "../models/bussiness.model.js";

class BussinessService {
  async getAll() {
    return await bussinessModel.find();
  }

  async getById(id) {
    return await bussinessModel.findById(id);
  }

  async create(bussiness) {
    return await bussinessModel.create(bussiness);
  }

  async update(id, bussiness) {
    return await bussinessModel.findByIdAndUpdate(id, bussiness);
  }
}

export const bussinessService = new BussinessService();
