import express from "express";
import {
  approveCrisis,
  createCrisis,
  getCrises,
  getCrisesOptions,
  getCrisisDetail,
  rejectCrisis,
} from "../controllers/crisisController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { allDataResponseFormatter } from "../middlewares/responseFormatter.js";

const crisisRouter = express.Router();

crisisRouter.get("/all", getCrises, allDataResponseFormatter);
crisisRouter.get("/options", getCrisesOptions);
crisisRouter.post("/create", createCrisis);
crisisRouter.put("/:id/approve", authenticateToken, isAdmin, approveCrisis);
crisisRouter.put("/:id/reject", authenticateToken, isAdmin, rejectCrisis);
crisisRouter.get("/:id", getCrisisDetail);

export default crisisRouter;
