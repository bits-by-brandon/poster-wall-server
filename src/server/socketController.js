const { logger } = require("./logger");

/**
 * @param {Socket} socket
 * @return void
 */
const socketController = socket => {
  logger.info("user connected");
  socket.on("disconnect", handleSocketDisconnect);
  socket.on("message", handleMessage);
};

/**
 * Function that logs a user disconnect action
 * @return void
 */
const handleSocketDisconnect = () => {
  logger.info("user disconnected");
};

/**
 * Logs a message to configured logger
 * @param msg
 * @return void
 */
const handleMessage = msg => {
  logger.info("message: " + msg);
};

module.exports = socketController;
