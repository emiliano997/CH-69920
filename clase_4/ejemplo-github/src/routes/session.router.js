import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/github", passport.authenticate("github"));

router.get(
  "/githubCallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    if (req.user) {
      req.session.user = req.user;
      return res.redirect("/");
    }

    res.redirect("/login");
  }
);

export default router;
