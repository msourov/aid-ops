import express from "express";
import {
  createUser,
  getUserDetail,
  getUsers,
  loginUser,
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/user/login", loginUser);
router.get("/users", getUsers);
router.get("/users/:id", getUserDetail);

// Protected routes
router.post("/user", authenticateToken, createUser);

export default router;
