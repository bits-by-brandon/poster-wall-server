import { Server } from "http";
import express = require("express");
import socketIO = require("socket.io");
import { initializeDb } from "./dbConnect";

import { port } from "./config";

import socketController from "./socketController";
import logger from "./logger";

// Types
import * as SocketIO from "socket.io";
import { SocketRequest } from "./types";
import { Express, Response } from "express";

// Routers
import control from "./routers/control";

const app: Express = express();
const http: Server = new Server(app);
const io: SocketIO = socketIO(http);

// Route io connections to socketController
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

// Routers
app.use("/control", control);

/**
 * Starts the passed in server
 *
 * @param {Server} http
 * @return Promise
 */
const startServer = (http: Server): Promise<void> => {
  return new Promise(resolve => {
    http.listen(port, resolve);
  });
};

function applicationReady(): void {
  // Inform the host environment that the application is ready
  if (typeof process.send === "function") {
    process.send("ready");
  }

  logger.info(`Server listening on port ${port}`);
}

// Start all required services, then send the ready signal
Promise.all([startServer(http), initializeDb()])
  .then(applicationReady)
  .catch(e => {
    logger.error(e);
  });
