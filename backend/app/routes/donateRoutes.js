import express from "express";
import {
  createDonation,
  getAllDonations,
  getTotalDonation,
} from "../controllers/donationController.js";

const donationRouter = express.Router();
donationRouter.get("/total", getTotalDonation);
donationRouter.post("/create", createDonation);
donationRouter.get("/all", getAllDonations);

export default donationRouter;
