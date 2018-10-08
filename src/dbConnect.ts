import * as Sequel from "sequelize";
import { dbHost, dbPort, dbUsername, dbPassword, dbDatabase } from "./config";

// Types
import { Sequelize } from "sequelize";
import logger from "./logger";

let connection;

const _initializeDb = (): Sequelize => {
  logger.info(`Connecting to DB on host ${dbHost}:${dbPort}`);
  return new Sequel(dbDatabase, dbUsername, dbPassword, {
    host: dbHost,
    dialect: "mysql"
  });
};

export const initializeDb = () => {
  if (connection) {
    return connection;
  }
  connection = _initializeDb();
  return connection;
};

export const getDb = async (): Promise<Sequelize> => {
  if (!connection) {
    try {
      connection = await _initializeDb();
      await connection.authenticate();
    } catch (e) {
      logger.error(e);
      connection = null;
      throw new Error(e);
    }
    return connection;
  } else {
    return connection;
  }
};
