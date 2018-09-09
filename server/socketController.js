const { logger } = require("./logger");

const socketController = socket => {
  logger.info("user connected");
  socket.on("disconnect", handleSocketDisconnect);
  socket.on("message", handleMessage);
};

const handleSocketDisconnect = () => {
  logger.info("user disconnected");
};

const handleMessage = msg => {
  logger.info("message: " + msg);
};

module.exports = socketController;
