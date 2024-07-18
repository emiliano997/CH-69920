import express from "express";
import wordRoutes from "./routes/word.routes.js";
import petRoutes from "./routes/pet.routes.js";

const app = express();
const PORT = 5000;

// Express config
app.use(express.json());

// Routes
app.use("/api/words", wordRoutes);
app.use("/api/pets", petRoutes);

// 404 Not Found
app.get("*", (req, res) => {
  res.json({ message: "Page not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
