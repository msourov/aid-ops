import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import helmet from "helmet";
import compression from "compression";

import userRouter from "./routes/userRoutes.js";
import crisisRouter from "./routes/crisisRoutes.js";
import donationRouter from "./routes/donateRoute.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { requestLogger } from "./middlewares/requestLogger.js";
import { unknownEndpoint } from "./middlewares/unknownEndpoint.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(compression());

app.use(requestLogger);

app.use("/api", userRouter);
app.use("/api/crisis", crisisRouter);
app.use("/api/donations", donationRouter);

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
    const dataToBroadcast = { message }; // Customize this as needed
    broadcastData(dataToBroadcast);
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
