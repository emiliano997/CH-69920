import cookieParser from "cookie-parser";
import express from "express";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@example.com" && password === "123") {
    const token = jwt.sign({ email }, "s3cr3t", {
      expiresIn: "5m",
    });
    // res.json({ message: "Login exitoso", token });
    // res.cookie("token", token, { maxAge: 100000 });
    res.cookie("token", token, { maxAge: 100000, httpOnly: true });
    res.json({ message: "Login exitoso" });
  }

  res.status(401).json({ message: "Usuario o contraseña incorrectos" });
});

app.get("/profile", (req, res) => {
  if (req.cookies.token) {
    res.json({ message: "Bienvenido" });
  } else {
    res.redirect("/");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
