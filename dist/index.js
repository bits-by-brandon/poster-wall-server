"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var helmet = require("helmet");
var socketIO = require("socket.io");
var config_1 = require("./config");
var dbConnect_1 = require("./dbConnect");
var socketController_1 = require("./socketController");
var logger_1 = require("./logger");
var http_1 = require("http");
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
// Middleware
app.use(helmet());
// Routers
app.use("/control", control_1.default);
/**
 * Starts the passed in server
 *
 * @param {Server} http
 * @return Promise
 */
var startServer = function (http) {
    return new Promise(function (resolve, reject) {
        http.on("error", function (e) {
            reject(e);
        });
        http.listen(config_1.port, resolve);
    }).then(function () {
        logger_1.default.info("Server listening on port " + config_1.port);
    });
};
/**
 * Sends the ready signal to the outside world
 */
function applicationReady() {
    // Inform the host environment that the application is ready
    if (typeof process.send === "function") {
        process.send("ready");
    }
}
// List of bootup tasks to be completed before setting the app as ready
var bootupTasks = [startServer(http), dbConnect_1.initializeDb()];
// Start all required services, then send the ready signal
Promise.all(bootupTasks)
    .then(applicationReady)
    .catch(function (e) {
    logger_1.default.error(e);
});
//# sourceMappingURL=index.js.map