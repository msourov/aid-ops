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
import { allDataResponseFormatter } from "../middlewares/responseFormatter.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/all-volunteers", getAllVolunteers, allDataResponseFormatter);
userRouter.get(
  "/available-volunteers",
  authenticateToken,
  isAdmin,
  getAvailableVolunteers,
  allDataResponseFormatter
);
userRouter.get("/volunteers", getVolunteerInfo);
userRouter.get("/volunteer-options", getVolunteerOptions);
userRouter.get("/:id", getUserDetail);

export default userRouter;
