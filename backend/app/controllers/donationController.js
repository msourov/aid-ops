import {
  createDonationInDB,
  fetchAllDonations,
  fetchTotalDonation,
} from "../models/donationModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { donorSchema } from "../validators/donationValidator.js";

export const getAllDonations = asyncHandler(async (req, res, next) => {
  const { limit = 10, offset = 0 } = req.query;

  const { donations, total } = await fetchAllDonations({
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  req.data = donations;
  req.totalRecords = total;

  next();
});

export const getTotalDonation = asyncHandler(async (req, res) => {
  const donations = await fetchTotalDonation();
  res.status(200).json(donations);
});

export const getDailyDonationExpense = asyncHandler(async (req, res) => {});

export const createDonation = asyncHandler(async (req, res) => {
  const { donor_name, donor_email, amount } = req.body;
  const { error } = await donorSchema({ donor_name, donor_email, amount });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const result = await createDonationInDB({ donor_name, donor_email, amount });
  console.log("result", result);
  res.status(201).json({ message: "Donation made!", result });
});
