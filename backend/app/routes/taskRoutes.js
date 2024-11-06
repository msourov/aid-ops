import express from "express";
import {
  assignTaskToVolunteer,
  createTask,
  getTasks,
  getUserTask,
  updateTask,
} from "../controllers/taskController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isVolunteer } from "../middlewares/isVolunteer.js";
import { allDataResponseFormatter } from "../middlewares/responseFormatter.js";

const taskRouter = express.Router();

taskRouter.get("/all", authenticateToken, getTasks, allDataResponseFormatter);
taskRouter.get("/my-tasks", authenticateToken, getUserTask);
taskRouter.post("/create", authenticateToken, isAdmin, createTask);
taskRouter.put("/update", authenticateToken, isVolunteer, updateTask);
taskRouter.put("/assign", authenticateToken, isAdmin, assignTaskToVolunteer);

export default taskRouter;
