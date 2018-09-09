const { logger } = require("./logger");

const initializeSocketIO = io => {
  io.on("connection", socket => socketController(socket, io));
};

const socketController = (socket, io) => {
  logger.info("user connected");
  socket.on("disconnect", handleSocketDisconnect);
  socket.on("message", handleMessage);
  setTimeout(() => {
    io.emit("SET_PATTERN", "pulse");
  }, 1000);
  setTimeout(() => {
    io.emit("SET_PATTERN", "spotlight");
  }, 4000);
};

const handleSocketDisconnect = () => {
  logger.info("user disconnected");
};

const handleMessage = msg => {
  logger.info("message: " + msg);
};

module.exports = {
  socketController,
  initializeSocketIO
};
