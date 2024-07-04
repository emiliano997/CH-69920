import passport from "passport";
import local from "passport-local";
import { userModel } from "../models/user.model.js";
import { createHash, comparePassword } from "../utils/hashFunctions.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  // Register strategy
  passport.use(
    "register",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        const { first_name, last_name, age } = req.body;

        if (!first_name || !last_name || !age) {
          return res.status(400).json({ error: "Falta información" });
        }
        try {
          const user = await userModel.findOne({ email: username });

          if (user) {
            done(null, false, { message: "El usuario ya existe" });
            return;
          }

          const hashPassword = createHash(password);

          // Se  guarda en la colección de usuarios
          const newUser = await userModel.create({
            first_name,
            last_name,
            email: username,
            age,
            password: hashPassword,
          });

          return done(null, newUser);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        console.log(username);
        console.log(password);
        console.log(done.toString());
        try {
          const user = await userModel.findOne({ email: username });

          if (!user) {
            return done(null, false, { message: "Usuario no encontrado" });
          }

          if (!comparePassword(password, user.password)) {
            return done(null, false, { message: "Contraseña incorrecta" });
          }

          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

export { initializePassport };
