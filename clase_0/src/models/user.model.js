import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

// Middleware ejemplo
// pre -> Antes de la consulta
// post -> Después de la consulta
userSchema.pre("save", function (next) {
  if (this.email.includes("@") && this.email.includes(".")) {
    next();
  }

  next(new Error("Email no válido"));
});

export const userModel = model("user", userSchema);
