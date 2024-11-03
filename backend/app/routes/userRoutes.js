import express from "express";
import {
  getAllVolunteers,
  getAvailableVolunteers,
  getUserDetail,
  getUsers,
  getVolunteerInfo,
  getVolunteerOptions,
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/all-volunteers", getAllVolunteers);
userRouter.get(
  "/available-volunteers",
  authenticateToken,
  isAdmin,
  getAvailableVolunteers
);
userRouter.get("/volunteers", getVolunteerInfo);
userRouter.get("/volunteer-options", getVolunteerOptions);
userRouter.get("/:id", getUserDetail);

export default userRouter;
