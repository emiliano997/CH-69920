import passport from "passport";
import GithubStrategy from "passport-github2";
import { userModel } from "../models/user.model";

export const initializePassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    userModel.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
