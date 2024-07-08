import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  age: { type: Number, require: true },
  password: { type: String, require: true },
  githubId: { type: String },
});

export const userModel = model("users", userSchema);
