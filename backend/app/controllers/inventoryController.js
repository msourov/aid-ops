import { fetchMonthlyDonation } from "../models/donationModel.js";
import {
  addToInventoryInDb,
  fetchInventoryData,
  fetchMonthlyExpense,
  fetchTotalExpense,
} from "../models/inventoryModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { inventorySchema } from "../validators/inventoryValidator.js";

export const getInventoryData = asyncHandler(async (req, res, next) => {
  const { limit = 10, offset = 0 } = req.query;

  const { inventoryData, total } = await fetchInventoryData({
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  req.data = inventoryData;
  req.totalRecords = total;

  next();
});

export const getMonthlyDonationExpense = asyncHandler(async (req, res) => {
  try {
    const lastMonthDonation = await fetchMonthlyDonation();
    const lastMonthExpense = await fetchMonthlyExpense();
    console.log(lastMonthDonation, lastMonthExpense);
    res.status(200).json({ ...lastMonthDonation, ...lastMonthExpense });
  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory data", error });
  }
});
export const getTotalExpenses = asyncHandler(async (req, res) => {
  try {
    const data = await fetchTotalExpense();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching total expenses.", error });
  }
});

export const addtoInventory = asyncHandler(async (req, res, next) => {
  const data = req.body;
  const { id: userId } = req.user;
  const { error } = inventorySchema(data);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const result = await addToInventoryInDb({ ...data, purchased_by: userId }); // Pass the userId as part of the data object
  console.log(result);
  res.status(201).json({ message: "Added to Inventory", result });
});
