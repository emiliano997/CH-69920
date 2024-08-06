import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  number: { type: Number, required: true },
  bussiness: { type: Schema.Types.ObjectId, ref: "bussiness", required: true },
  user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  products: [],
  status: {
    type: String,
    required: true,
    enum: ["pending", "cancelled", "completed"],
    default: "pending",
  },
  totalPrice: { type: Number, required: true },
});

orderSchema.pre("find", function (next) {
  this.populate("bussiness");
  this.populate("user");
  next();
});

orderSchema.pre("findOne", function (next) {
  this.populate("bussiness");
  this.populate("user");
  next();
});

export const orderModel = model("order", orderSchema);
