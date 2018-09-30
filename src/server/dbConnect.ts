/// <reference path=""
import r = require("rethinkdb");
import { dbHost, dbPort } from "./config";

// Types
import { Connection } from "rethinkdb";
import logger from "./logger";

let connection: Connection;

const _initializeDb = (r): Promise<Connection> => {
  logger.info(`Connecting to DB on host ${dbHost}:${dbPort}`);
  return r.connect({ host: dbHost, port: dbPort });
};

export const initializeDb = (): Promise<Connection> => {
  return _initializeDb(r);
};

export const getDb = async (): Promise<Connection> => {
  if (!connection) {
    try {
      connection = await _initializeDb(r);
    } catch (e) {
      logger.error(e);
      throw new Error(e);
    }
    return connection;
  } else {
    return connection;
  }
};
