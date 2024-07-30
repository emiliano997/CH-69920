import { Schema, model } from "mongoose";

const pokemonSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
});

export const pokemonModel = model("pokemon", pokemonSchema);
