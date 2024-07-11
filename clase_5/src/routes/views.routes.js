import { Router } from "express";
import { authToken } from "../utils/jwtFunctions.js";

const router = Router();

router.get("/", (req, res) => {
  if (!req.cookies.currentUser) {
    res.render("login");
  } else {
    res.redirect("/current");
  }
});

router.get("/current", authToken, (req, res) => {
  if (req.user) {
    res.render("current", { user: req.user });
  } else {
    res.redirect("/");
  }
});

export default router;
