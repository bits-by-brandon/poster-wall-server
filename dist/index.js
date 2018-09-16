"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var express = require("express");
var socketIO = require("socket.io");
var http_1 = require("http");
var socketController_1 = require("./socketController");
var logger_1 = require("./logger");
// Routers
var control_1 = require("./routers/control");
var app = express();
var http = new http_1.Server(app);
var io = socketIO(http);
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
app.use("/control", control_1.default);
// Start the http server
http.listen(config_1.port, function () {
    logger_1.default.info("Server listening on port " + config_1.port);
    // Inform the host environment that the application is ready
    if (typeof process.send === "function") {
        process.send("ready");
    }
});
//# sourceMappingURL=index.js.map