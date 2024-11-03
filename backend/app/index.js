import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import helmet from "helmet";
import compression from "compression";

import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import crisisRouter from "./routes/crisisRoutes.js";
import donationRouter from "./routes/donateRoutes.js";
import inventoryRouter from "./routes/inventoryRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { requestLogger } from "./middlewares/requestLogger.js";
import { unknownEndpoint } from "./middlewares/unknownEndpoint.js";
import financialsRouter from "./routes/financialsRoute.js";
import authRouter from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const port = process.env.DB_PORT || 5000;

const server = createServer(app);
const wss = new WebSocketServer({ server });

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
app.use(compression());

app.use(requestLogger);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/crises", crisisRouter);
app.use("/api/v1/donations", donationRouter);
app.use("/api/v1/inventory", inventoryRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/financials", financialsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export const broadcastData = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

wss.on("connection", (ws) => {
  console.log("WebSocket connection established");

  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);

    // Optionally, you can process the message here
    // and broadcast a response if needed
    const dataToBroadcast = { message };
    broadcastData(dataToBroadcast);
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
