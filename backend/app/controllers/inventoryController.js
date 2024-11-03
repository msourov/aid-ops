import { fetchDailyDonation } from "../models/donationModel.js";
import {
  addToInventoryInDb,
  fetchDailyExpense,
  fetchInventoryData,
  fetchTotalExpense,
} from "../models/inventoryModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { inventorySchema } from "../validators/inventoryValidator.js";

export const getInventoryData = asyncHandler(async (req, res) => {
  console.log("inventory req ", req);
  try {
    const [result] = await fetchInventoryData();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory data", error });
  }
});

export const getDailyDonationExpense = asyncHandler(async (req, res) => {
  try {
    const dailyDonation = await fetchDailyDonation();
    const dailyExpense = await fetchDailyExpense();
    console.log(dailyDonation, dailyExpense);
    res.status(200).json({ ...dailyDonation, ...dailyExpense });
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
