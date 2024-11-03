import express from "express";
import { createUser, loginUser } from "../controllers/userController.js";

const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", createUser);

export default authRouter;
