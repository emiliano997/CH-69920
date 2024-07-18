import express from "express";
import userRoutes from "./routes/user.routes.js";

const app = express();
const PORT = 5000;

// Routes
app.use("/api/users", userRoutes.getRouter());

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
