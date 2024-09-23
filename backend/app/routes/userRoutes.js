import express from "express";
import {
  createUser,
  getAllVolunteers,
  getAvailableVolunteers,
  getUserDetail,
  getUsers,
  getVolunteerInfo,
  loginUser,
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const userRouter = express.Router();

userRouter.post("/user/login", loginUser);
userRouter.get("/users", getUsers);
userRouter.get("/users/:id", getUserDetail);
userRouter.post("/user/register", createUser);
userRouter.get("/user/all-volunteers", getAllVolunteers);
userRouter.get(
  "/user/available-volunteers",
  authenticateToken,
  isAdmin,
  getAvailableVolunteers
);
userRouter.get("/user/volunteers", getVolunteerInfo);

export default userRouter;
