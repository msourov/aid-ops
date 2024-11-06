import express from "express";
import {
  addtoInventory,
  getInventoryData,
  getMonthlyDonationExpense,
  getTotalExpenses,
} from "../controllers/inventoryController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { allDataResponseFormatter } from "../middlewares/responseFormatter.js";

const inventoryRouter = express.Router();

inventoryRouter.get(
  "/",
  authenticateToken,
  getInventoryData,
  allDataResponseFormatter
);
inventoryRouter.get("/total-expense", getTotalExpenses);
inventoryRouter.get("/daily-donation-expense", getMonthlyDonationExpense);
inventoryRouter.post("/create", authenticateToken, addtoInventory);

export default inventoryRouter;
