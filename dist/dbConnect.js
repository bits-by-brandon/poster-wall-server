"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path=""
var r = require("rethinkdb");
var config_1 = require("./config");
var _initializeDb = function (r) {
    return new Promise(function (resolve, reject) {
        r.connect({ host: config_1.dbHost, port: config_1.dbPort }, function (err, conn) {
            if (err) {
                reject(err);
            }
            resolve(conn);
        });
    });
};
exports.initializeDb = function () {
    return _initializeDb(r);
};
//# sourceMappingURL=dbConnect.js.map