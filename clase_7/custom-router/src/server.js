import express from "express";
import userRoutes from "./routes/user.routes.js";
import sessionRoutes from "./routes/session.routes.js";

const app = express();
const PORT = 5000;

app.use(express.json());

// Routes
app.use("/api/users", userRoutes.getRouter());
app.use("/api/session", sessionRoutes.getRouter());

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
