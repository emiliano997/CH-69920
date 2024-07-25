import { Schema, model } from "mongoose";

const toySchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

export const toyModel = model("Toy", toySchema);
