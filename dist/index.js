"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
// Development mode config
if (process.env.NODE_ENV === "development") {
    // Serve files via express
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
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                /** Run setup tasks */
                return [4 /*yield*/, Promise.all([dbConnect_1.initializeDb()])];
                case 1:
                    /** Run setup tasks */
                    _a.sent();
                    /** Run startup tasks */
                    return [4 /*yield*/, Promise.all([startServer(http)])];
                case 2:
                    /** Run startup tasks */
                    _a.sent();
                    /** Send the ready signal */
                    applicationReady();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Main function. Bootstraps entire application
 */
main().catch(function (e) {
    logger_1.default.error(e);
});
//# sourceMappingURL=index.js.map