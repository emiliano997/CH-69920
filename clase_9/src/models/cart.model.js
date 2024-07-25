import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  toys: [
    {
      toy: { type: Schema.Types.ObjectId, ref: "toy", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  status: {
    type: String,
    required: true,
    enum: ["pending", "done"],
  },
});

export const cartModel = model("cart", cartSchema);
