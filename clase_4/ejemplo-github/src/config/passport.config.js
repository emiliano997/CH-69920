import passport from "passport";
import GithubStrategy from "passport-github2";
import { userModel } from "../models/user.model.js";

export const initializePassport = () => {
  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: "",
        clientSecret: "",
        callbackURL: "http://localhost:5000/api/sessions/githubCallback",
        scope: ["user:email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile);

          const user = await userModel.findOne({
            email: profile.emails[0].value,
          });

          if (user) {
            return done(null, user);
          }

          const newUser = await userModel.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            age: profile.age,
            githubId: profile.id,
          });

          return done(null, newUser);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    userModel.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
