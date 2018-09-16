var logger = require("./logger").logger;
/**
 * @param {Socket} socket
 * @return void
 */
var socketController = function (socket) {
    logger.info("user connected");
    socket.on("disconnect", handleSocketDisconnect);
    socket.on("message", handleMessage);
};
/**
 * Function that logs a user disconnect action
 * @return void
 */
var handleSocketDisconnect = function () {
    logger.info("user disconnected");
};
/**
 * Logs a message to configured logger
 * @param msg
 * @return void
 */
var handleMessage = function (msg) {
    logger.info("message: " + msg);
};
module.exports = socketController;
//# sourceMappingURL=socketController.js.map