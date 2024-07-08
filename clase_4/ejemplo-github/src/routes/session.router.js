import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/github", (req, res) => {});

router.get("/githubCallback", async (req, res) => {
  if (req.user) {
    req.session.user = req.user;
    return res.redirect("/");
  }

  res.redirect("/login");
});
