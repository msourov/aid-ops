import express from "express";
import {
  createUser,
  getUserDetail,
  getUsers,
  loginUser,
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/user/login", loginUser);
userRouter.get("/users", getUsers);
userRouter.get("/users/:id", getUserDetail);
userRouter.post("/user", createUser);

export default userRouter;
