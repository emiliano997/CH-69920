import { Schema, model } from "mongoose";

const userSchema = new Schema({
  first_name: { type: String, require: true },
  last_name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  role: { type: String, require: true, default: "user" },
  // role: { type: Enum, values: ["admin", "user"], default: "user" },
  password: { type: String, require: true },
});

export const userModel = model("users", userSchema);
