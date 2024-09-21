import express from "express";
import { createDonation } from "../controllers/donationController.js";

const donationRouter = express.Router();
donationRouter.post("/donate", createDonation);

export default donationRouter;
