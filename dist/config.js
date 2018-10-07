"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = parseInt(process.env.PORT) || 9002;
exports.appName = process.env.APP_NAME || "application";
exports.dbHost = process.env.DB_HOST || "localhost";
exports.dbPort = parseFloat(process.env.DB_PORT) || 28015;
//# sourceMappingURL=config.js.map