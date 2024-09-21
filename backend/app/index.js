import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/userRoutes.js";
import crisisRouter from "./routes/crisisRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { requestLogger } from "./middlewares/requestLogger.js";
import { unknownEndpoint } from "./middlewares/unknownEndpoint.js";
import donationRouter from "./routes/donateRoute.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.use("/api", userRouter);
app.use("/api", crisisRouter);
app.use("/api", donationRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
