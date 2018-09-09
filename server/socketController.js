const { logger } = require("./logger");


const socketController = (socket, io) => {
  logger.info("user connected");
  socket.on("disconnect", handleSocketDisconnect);
  socket.on("message", handleMessage);
  setTimeout(() => {
    socket.emit("SET_PATTERN", "pulse");
  }, 1000);
};

const handleSocketDisconnect = () => {
  logger.info("user disconnected");
};

const handleMessage = msg => {
  logger.info("message: " + msg);
};

module.exports = socketController;
