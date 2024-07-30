import express from "express";
import MongoProvider from "./providers/mongoProvider.js";

const app = express();
const PORT = 5000;

MongoProvider.connect();

app.get("/mongo", async (req, res) => {
  const connection = await MongoProvider.connect();

  connection.model("user", {
    name: { type: String, required: true },
    email: { type: String, required: true },
  });

  console.log(connection.models);

  res.send("Hola mundo");
});

app.get("/users", async (req, res) => {
  const connection = await MongoProvider.connect();

  res.json("Hola mundo");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
