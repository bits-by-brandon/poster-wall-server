"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("./logger");
/**
 * @param {SocketIO} socket
 * @return void
 */
exports.default = (function (socket) {
    logger_1.default.info("user connected");
    socket.on("disconnect", handleSocketDisconnect);
    socket.on("message", handleMessage);
});
/**
 * Function that logs a user disconnect action
 * @return void
 */
var handleSocketDisconnect = function () {
    logger_1.default.info("user disconnected");
};
/**
 * Logs a message to configured logger
 * @param msg
 * @return void
 */
var handleMessage = function (msg) {
    logger_1.default.info("message: " + msg);
};
//# sourceMappingURL=socketController.js.map