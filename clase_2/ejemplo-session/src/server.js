import express from "express";
import cookieParser from "cookie-parser";
import FileStore from "session-file-store";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();
const PORT = 5000;

// Express config
app.use(cookieParser());

// Session config
// File Storage
// const fileStorage = FileStore(session);
// app.use(
//   session({
//     secret: "s3cr3t",
//     resave: true,
//     saveUninitialized: true,
//     store: new fileStorage({
//       path: "./sessions",
//       ttl: 2,
//       retries: 0,
//     }),
//   })
// );

// MongoDB Storage
app.use(
  session({
    secret: "s3cr3t",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: "",
      ttl: 10,
    }),
  })
);

// Routes
app.get("/", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send(`Contador: ${req.session.counter}`);
  } else {
    req.session.counter = 1;
    res.send(`Bienvenido`);
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.status(500).send("Error al borrar la sesión");
    res.send("Sesión borrada");
  });
});

app.get("/info", (req, res) => {
  res.send(req.session);
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
