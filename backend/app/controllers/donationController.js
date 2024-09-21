import {
  createDonationInDB,
  fetchTotalDonation,
} from "../models/donationModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validateDonor } from "../validators/donationValidator.js";

export const getTotalDonation = asyncHandler(async (req, res) => {
  const donations = await fetchTotalDonation();
  res.status(200).json(donations);
});

export const createDonation = asyncHandler(async (req, res) => {
  const { donor_name, donor_email, amount } = req.body;
  const { error } = await validateDonor({ donor_name, donor_email, amount });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const result = await createDonationInDB({ donor_name, donor_email, amount });
  console.log("result", result);
  res.status(201).json({ message: "Donation made!", result });
});
