import express = require("express");
import socketIO = require("socket.io");
import { port } from "./config";
import { initializeDb } from "./dbConnect";
import socketController from "./socketController";
import logger from "./logger";

// Types
import * as SocketIO from "socket.io";
import { CustomRequest } from "./types";
import { Express, Response } from "express";
import { Server } from "http";

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
  (req: CustomRequest, res: Response, next: Function): void => {
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
  return new Promise((resolve, reject) => {
    http.on("error", e => {
      reject(e);
    });
    http.listen(port, resolve);
  }).then(() => {
    logger.info(`Server listening on port ${port}`);
  });
};

/**
 * Sends the ready signal to the outside world
 */
function applicationReady(): void {
  // Inform the host environment that the application is ready
  if (typeof process.send === "function") {
    process.send("ready");
  }
}

// List of bootup tasks to be completed before setting the app as ready
const bootupTasks: Array<Promise<any>> = [startServer(http), initializeDb()];

// Start all required services, then send the ready signal
Promise.all(bootupTasks)
  .then(applicationReady)
  .catch(e => {
    logger.error(e);
  });
