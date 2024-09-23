import { fetchFinancialData } from "../models/financialsModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getFinancialData = asyncHandler(async (req, res) => {
  try {
    const data = await fetchFinancialData();
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users", error });
  }
});
