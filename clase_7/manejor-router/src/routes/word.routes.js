import { Router } from "express";

const router = Router();

const words = ["hello", "world", "test"];
const languages = ["en", "es"];

// Validations
router.param("word", async (req, res, next, word) => {
  const wordExists = words.includes(word);

  if (!wordExists) {
    return res.status(404).json({ error: "Word not found" });
  }

  req.word = word;

  next();
});

router.param("lang", async (req, res, next, lang) => {
  const langExists = languages.includes(lang);

  if (!langExists) {
    return res.status(404).json({ error: "Language not found" });
  }

  req.lang = lang;

  next();
});

// Ejemplo ECommerce
// router.param("cid", async (req, res, next, cid) => {
//   // Chequean de que exista el carrito
//   // Devolver el carrito en req.cart

// });

// router.param("pid", async (req, res, next, pid) => {
//   // Chequean de que exista el producto
//    // Devolver el producto en req.product
// });

// router.post("/:cid/products/:pid", (req, res) => {
//   // Create product logic
//  // Cart: req.cart
//  // Product: req.product
// });

router.get("/:word/:lang([a-zA-Z]+)", (req, res) => {
  res.json({ word: req.word, lang: req.lang });
});

router.get("/:word([a-zA-Z]+)", (req, res) => {
  res.json({ word: req.word });
});

router.put("/:word([a-zA-Z]+)", (req, res) => {
  // Update logic
  res.json({ word: req.word });
});

router.delete("/:word([a-zA-Z]+)", (req, res) => {
  // Delete logic
  res.json({ word: req.word });
});

export default router;
