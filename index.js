const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const { logger, errorHandler } = require("./server/logger");
const socketController = require("./server/socketController");

// Routers
const control = require("./server/routers/control");

const appName = process.env.APP_NAME || "application";

io.on("connection", socket => socketController(socket, io));

// Allow ips to come from proxy forward
app.enable("trust proxy");

if(process.env.NODE_ENV === 'development') {
  app.use(express.static(__dirname + '/public'));
}

// Let other middleware use the spawned IO instance
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/control", control);

http.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
  if (typeof process.send === "function") {
    process.send("ready");
  }
});

module.exports = {
  appName,
  io
};
