import {
  approveCrisisInDB,
  createCrisisInDB,
  fetchCrises,
  fetchCrisisById,
  fetchCrisisOptions,
  rejectCrisisInDb,
} from "../models/crisisModel.js";
import { crisisSchema } from "../validators/crisisValidator.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getCrises = asyncHandler(async (req, res) => {
  const [crises] = await fetchCrises();
  res.status(200).json(crises);
});

export const getCrisesOptions = asyncHandler(async (req, res) => {
  const [crises] = await fetchCrisisOptions();
  res.status(200).json(crises);
});

export const getCrisisDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const [crisis] = await fetchCrisisById(id);
  console.log(crisis);
  return res.status(200).json(crisis[0]);
});

export const createCrisis = asyncHandler(async (req, res) => {
  const { title, description, location, severity } = req.body;
  const status = req.body.status || "pending";
  const { error } = await crisisSchema({
    title,
    description,
    location,
    severity,
    status,
  });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const userId = req.user?.id;

  const newCrisis = await createCrisisInDB({
    title,
    description,
    location,
    severity,
    status,
    userId,
  });

  res.status(201).json({ message: "Crisis created", crisis: newCrisis });
});

export const approveCrisis = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const updatedCrisis = await approveCrisisInDB(id, userId);
  res.status(200).json(updatedCrisis);
});

export const rejectCrisis = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const updatedCrisis = await rejectCrisisInDb(id, userId);
  res.status(200).json(updatedCrisis);
});
