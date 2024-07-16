import passport from "passport";
import jwt from "passport-jwt";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

export function initializePassport() {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: "s3cr3t",
      },
      async (payload, done) => {
        try {
          return done(null, payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
}

function cookieExtractor(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }

  return token;
}
