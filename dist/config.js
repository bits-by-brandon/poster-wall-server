"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var dbConfig = JSON.parse(fs.readFileSync(path.join(__dirname, "../dbconfig.json"), "utf8"));
exports.dbHost = dbConfig["host"] || "127.0.0.1";
exports.dbPort = dbConfig["port"] || 3306;
exports.dbUsername = dbConfig["username"];
exports.dbPassword = dbConfig["password"];
exports.dbDatabase = dbConfig["database"];
exports.port = parseInt(process.env.PORT) || 9002;
exports.appName = process.env.APP_NAME || "application";
//# sourceMappingURL=config.js.map