"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var express = require("express");
var socketIO = require("socket.io");
var dbConnect_1 = require("./dbConnect");
var config_1 = require("./config");
var socketController_1 = require("./socketController");
var logger_1 = require("./logger");
// Routers
var control_1 = require("./routers/control");
var app = express();
var http = new http_1.Server(app);
var io = socketIO(http);
// Route io connections to socketController
io.on("connection", function (socket) { return socketController_1.default(socket); });
// Allow ips to come from proxy forward
app.enable("trust proxy");
if (process.env.NODE_ENV === "development") {
    app.use(express.static(__dirname + "/public"));
}
// Let other middleware use the instantiated io instance
app.use(function (req, res, next) {
    req.io = io;
    next();
});
// Routers
app.use("/control", control_1.default);
/**
 * Starts the passed in server
 *
 * @param {Server} http
 * @return Promise
 */
var startServer = function (http) {
    return new Promise(function (resolve) {
        http.listen(config_1.port, resolve);
    });
};
function applicationReady() {
    // Inform the host environment that the application is ready
    if (typeof process.send === "function") {
        process.send("ready");
    }
    logger_1.default.info("Server listening on port " + config_1.port);
}
// Start all required services, then send the ready signal
Promise.all([startServer(http), dbConnect_1.initializeDb()])
    .then(applicationReady)
    .catch(function (e) {
    logger_1.default.error(e);
});
//# sourceMappingURL=index.js.map