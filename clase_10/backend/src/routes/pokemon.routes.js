import { Router } from "express";
import { pokemonModel } from "../models/pokemon.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const pokemons = await pokemonModel.find();
    console.log(pokemons);

    res.cookie("count", "100", {
      maxAge: 100000,
    });
    res.json({
      pokemons,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los pokemons",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pokemon = await pokemonModel.findById(id);
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener el pokemon",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, type } = req.body;

    if (!name || !description || !type) {
      return res.status(400).json({
        error: "Falta información",
      });
    }

    const pokemon = await pokemonModel.create({
      name,
      description,
      type,
    });

    res.status(201).json(pokemon);
  } catch (error) {
    res.status(500).json({
      error: "Error al crear el pokemon",
    });
  }
});

export default router;
