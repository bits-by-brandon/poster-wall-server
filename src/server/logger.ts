import * as winston from "winston";
import { Transports } from "winston/lib/winston/transports";

const logger: winston = winston;

if (process.env.NODE_ENV === "production") {
  winston.add(
    winston.transports.File({
      filename: __dirname + "/logs/combined.log"
    })
  );

  winston.add(
    winston.transports.File({
      filename: __dirname + "/logs/errors.log",
      level: "error"
    })
  );
}

/**
 * Generic function to node.js callback style errors
 * @param {Error} err - Error to be handled
 */
export const errorHandler = (err: string) => {
  if (err) {
    winston.error(err);
  }
};

export default logger;