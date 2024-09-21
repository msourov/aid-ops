import express from "express";
import { createDonation } from "../controllers/donationController.js";

const donationRouter = express.Router();
donationRouter.post("/", createDonation);

export default donationRouter;
