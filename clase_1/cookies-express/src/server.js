import express from "express";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 5000;

// Express config
app.use(cookieParser("s3cr3t"));

// Routes
app.get("/", (req, res) => {
  res.send("Hola mundo");
});

// Cookies
// app.post("/login", (req, res) => {
//   // Lógica del login
//   res.cookie("token", "123456789", {
//     maxAge: 10000,
//   });
//   res.send("Login exitoso");
// })

// Set Cookie
app.get("/set-cookie", (req, res) => {
  res.cookie("super-cookie", "Super valor de cookie", {
    maxAge: 10000,
  });
  res.send("Cookie creado");
});

// Get Cookie
app.get("/get-cookie", (req, res) => {
  const cookie = req.cookies;

  console.log(req.signedCookies);

  res.send(cookie);
});

// Delete Cookie
app.get("/delete-cookie", (req, res) => {
  res.clearCookie("super-cookie");

  res.send("Cookie eliminado");
});

// Set Cookies Firmadas (Signed Cookies)
app.get("/set-cookie-signed", (req, res) => {
  res.cookie("cookie-firmada", "Esta cookie está firmada", {
    maxAge: 100000,
    signed: true,
  });

  res.send("Cookie firmado");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
