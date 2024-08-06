import { Schema, model } from "mongoose";

const bussinessSchema = new Schema({
  name: { type: String, required: true },
  products: {
    type: [
      {
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    default: [],
  },
});

export const bussinessModel = model("bussiness", bussinessSchema);
