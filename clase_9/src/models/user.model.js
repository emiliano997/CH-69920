import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  carts: [{ type: Schema.Types.ObjectId, ref: "cart", default: [] }],
});

export const userModel = model("user", userSchema);
