import express from "express";
import {
  createDonation,
  getAllDonations,
  getTotalDonation,
} from "../controllers/donationController.js";
import { allDataResponseFormatter } from "../middlewares/responseFormatter.js";

const donationRouter = express.Router();

donationRouter.get("/all", getAllDonations, allDataResponseFormatter);
donationRouter.get("/total", getTotalDonation);
donationRouter.post("/create", createDonation);

export default donationRouter;
