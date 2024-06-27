import express from "express";
import session from "express-session";

const app = express();
const PORT = 5000;

// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "s3cr3t",
    resave: true,
    saveUninitialized: true,
  })
);

// Se crea la sesión dentro del objeto req
app.get("/session", (req, res) => {
  console.log(req.session);
  if (req.session.contador) {
    req.session.contador++;
    res.send(`Contador: ${req.session.contador}`);
  } else {
    req.session.contador = 1;
    res.send(`Bienvenido a la aplicación`);
  }
});

// Login custom
app.get("/login", (req, res) => {
  const { username, password } = req.query;
  if (username !== "admin" || password !== "123") {
    return res.status(401).send("Usuario o contraseña incorrectos");
  }

  req.session.user = username;
  req.session.admin = true;

  res.send("Login exitoso");
});

// Profile
app.get("/profile", auth, (req, res) => {
  res.send(req.session.user);
});

// Se borra la sesión del objeto req
app.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.status(500).send("Error al borrar la sesión");

    res.send("Sesión borrada");
  });
});

// Middleware
function auth(req, res, next) {
  console.log(req.session);
  if (req.session?.user === "admin" && req.session?.admin) {
    return next();
  }

  res.status(401).send("No autorizado");
}

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
