const winston = require("winston");

let transports = [new winston.transports.Console()];

// Adds file logging if in production
if (process.env.NODE_ENV === "production") {
  transports = transports.concat([
    new winston.transports.File({ filename: __dirname + "/logs/combined.log" }),
    new winston.transports.File({
      filename: __dirname + "/logs/errors.log",
      level: "error"
    })
  ]);
}

const logger = winston.createLogger({ transports });

/**
 * Generic function to node.js callback style errors
 * @param {Error} err - Error to be handled
 */
const errorHandler = err => {
  if (err) {
    logger.error(err);
  }
};

module.exports = {
  logger,
  errorHandler
};
