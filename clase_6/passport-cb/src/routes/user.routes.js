import { Router } from "express";
import { authorization } from "../utils.js";

const router = Router();

// BD
const users = [
  {
    name: "admin",
    email: "admin@example.com",
    password: "123",
    role: "admin",
  },
  {
    name: "admin2",
    email: "admin2@example.com",
    password: "123",
    role: "admin",
  },
  {
    name: "admin3",
    email: "admin3@example.com",
    password: "123",
    role: "admin",
  },
  {
    name: "user",
    email: "user@example.com",
    password: "123",
    role: "user",
  },
  {
    name: "user2",
    email: "user2@example.com",
    password: "123",
    role: "user",
  },
  {
    name: "user3",
    email: "user3@example.com",
    password: "123",
    role: "user",
  },
];

router.get("/", authorization(["user", "admin"]), async (req, res) => {
  res.json(users.filter((user) => user.role === "user"));
});

router.get("/admin", authorization(["admin"]), (req, res) => {
  res.json(users.filter((user) => user.role === "admin"));
});

export default router;
