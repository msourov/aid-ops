import express from "express";
import { getFinancialData } from "../controllers/financialController.js";

const financialsRouter = express.Router();

financialsRouter.get("/", getFinancialData);

export default financialsRouter;
