import {
  createTaskInDb,
  fetchTasks,
  fetchUserTask,
  updateTaskInDB,
} from "../models/taskModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
export { taskSchema } from "../validators/taskValidator.js";

export const getTasks = asyncHandler(async (req, res, next) => {
  const { limit = 10, offset = 0 } = req.query;
  const { tasks, total } = await fetchTasks({
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  req.data = tasks;
  req.totalRecords = total;

  next();
});

export const createTask = asyncHandler(async (req, res, next) => {
  const { id: adminId } = req.user;
  const status = req.body.status || "pending";
  console.log("req.body", req.body);
  // console.log("taskSchema", taskSchema);
  // const { error } = taskSchema(req.body);
  // if (error) {
  //   return res.status(400).json({ message: error.details[0].message });
  // }

  const newTask = await createTaskInDb({ ...req.body, status, adminId });
  res.status(201).json({ message: "Task created successfully", task: newTask });
});

export const getUserTask = asyncHandler(async (req, res) => {
  try {
    const { id } = req.user;
    const [myTasks] = await fetchUserTask(id);
    res.status(200).json(myTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user task", error });
  }
});

export const updateTask = asyncHandler(async (req, res, next) => {
  const { status, taskId } = req.body;
  try {
    await updateTaskInDB(status, taskId);
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating task", error });
  }
});

export const assignTaskToVolunteer = asyncHandler(async (req, res) => {
  try {
    const taskId = await assignTaskToVolunteer(req.body);
    res.status(201).json({ message: "Task assigned successfully", taskId });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error assigning task", error: err.message });
  }
});
