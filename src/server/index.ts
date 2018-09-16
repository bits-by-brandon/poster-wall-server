import { port } from "./config";
import express = require("express");
import socketIO = require("socket.io");
import { Server } from "http";

import socketController from "./socketController";
import logger from "./logger";

// Types
import * as SocketIO from "socket.io";
import { SocketRequest } from "./types";
import {Express, Response} from "express";

// Routers
import control from "./routers/control";

const app: Express = express();
const http: Server = new Server(app);
const io: SocketIO = socketIO(http);
io.on("connection", socket => socketController(socket));

// Allow ips to come from proxy forward
app.enable("trust proxy");

if (process.env.NODE_ENV === "development") {
  app.use(express.static(__dirname + "/public"));
}

// Let other middleware use the instantiated io instance
app.use(
  (req: SocketRequest, res: Response, next: Function): void => {
    req.io = io;
    next();
  }
);

app.use("/control", control);

// Start the http server
http.listen(
  port,
  (): void => {
      // Inform the host environment that the application is ready
      if (typeof process.send === "function") {
          process.send("ready");
      }

      logger.info(`Server listening on port ${port}`);
  }
);
