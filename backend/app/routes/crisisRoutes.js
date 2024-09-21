import express from "express";
import {
  approveCrisis,
  createCrisis,
  getCrises,
  getCrisisDetail,
  rejectCrisis,
} from "../controllers/crisisController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const crisisRouter = express.Router();

crisisRouter.get("/crisis", getCrises);
crisisRouter.get("/crisis/:id", getCrisisDetail);
crisisRouter.post("/crisis", createCrisis);
crisisRouter.put(
  "/crisis/:id/approve",
  authenticateToken,
  isAdmin,
  approveCrisis
);
crisisRouter.put(
  "/crisis/:id/reject",
  authenticateToken,
  isAdmin,
  rejectCrisis
);

export default crisisRouter;
