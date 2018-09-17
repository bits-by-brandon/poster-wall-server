/// <reference path=""
import r = require("rethinkdb");
import { dbHost, dbPort } from "./config";

// Types
import { Connection } from "rethinkdb";

const _initializeDb = (r): Promise<Connection | Error> => {
  return new Promise((resolve, reject) => {
    r.connect(
      { host: dbHost, port: dbPort },
      (err: Error, conn) => {
        if (err) {
          reject(err);
        }
        resolve(conn);
      }
    );
  });
};

export const initializeDb = (): Promise<Connection | Error> => {
  return _initializeDb(r);
};
