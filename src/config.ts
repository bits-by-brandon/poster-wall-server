import fs = require("fs");
import path = require("path");

const dbConfig= JSON.parse(fs.readFileSync(path.join(__dirname, "../dbconfig.json"), "utf8"));

export const dbHost: string = dbConfig["host"] || "127.0.0.1";
export const dbPort: number = dbConfig["port"] || 3306;
export const dbUsername: string = dbConfig["username"];
export const dbPassword: string = dbConfig["password"];
export const dbDatabase: string = dbConfig["database"];
export const port: number = parseInt(process.env.PORT) || 9002;
export const appName: string = process.env.APP_NAME || "application";
