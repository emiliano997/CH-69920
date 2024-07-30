import express from "express";
import MongoProvider from "./providers/mongoProvider.js";
import pokemonRoutes from "./routes/pokemon.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = 5000;

// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:3000"],
    methods: "POST",
  })
);

MongoProvider.connect();

app.use("/api/pokemons", pokemonRoutes);

// app.get("/mongo", async (req, res) => {
//   const connection = await MongoProvider.connect();

//   connection.model("user", {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//   });

//   console.log(connection.models);

//   res.send("Hola mundo");
// });

// app.get("/users", async (req, res) => {
//   const connection = await MongoProvider.connect();

//   res.json("Hola mundo");
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
