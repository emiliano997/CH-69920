import { Router } from "express";

const router = Router();

const pets = [];

router.param("pet", (req, res, next, pet) => {
  const petExists = pets.find((p) => p.name === pet);

  if (!petExists) {
    return res.status(404).json({ error: "Pet not found" });
  }

  req.pet = petExists;

  next();
});

router.post("/", (req, res) => {
  const { name, specie } = req.body;

  if (!name || !specie) {
    return res.status(400).json({ error: "Falta información" });
  }

  pets.push({ name, specie });
  res.json({ pet: { name, specie } });
});

router.get("/:pet([a-zA-Z20%]+)", (req, res) => {
  res.json({ pet: req.pet });
});

router.put("/:pet([a-zA-Z20%]+)", (req, res) => {
  const newPet = { ...req.pet, adopted: true };

  const index = pets.findIndex((pet) => pet.name === req.pet.name);

  pets[index] = newPet;

  res.json({ pet: newPet });
});

export default router;
