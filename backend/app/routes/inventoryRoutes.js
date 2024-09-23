import express from "express";
import {
  addtoInventory,
  getDailyDonationExpense,
  getInventoryData,
  getTotalExpenses,
} from "../controllers/inventoryController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const inventoryRouter = express.Router();

inventoryRouter.get("/", authenticateToken, getInventoryData);
inventoryRouter.get("/total-expense", getTotalExpenses);
inventoryRouter.get("/daily-donation-expense", getDailyDonationExpense);
inventoryRouter.post("/create", authenticateToken, addtoInventory);

export default inventoryRouter;
