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

crisisRouter.get("/", getCrises);
crisisRouter.get("/:id", getCrisisDetail);
crisisRouter.post("", createCrisis);
crisisRouter.put("/:id/approve", authenticateToken, isAdmin, approveCrisis);
crisisRouter.put("/:id/reject", authenticateToken, isAdmin, rejectCrisis);

export default crisisRouter;
