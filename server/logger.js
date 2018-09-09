const winston = require("winston");
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: __dirname + "/logs/combined.log" }),
    new winston.transports.File({
      filename: __dirname + "/logs/errors.log",
      level: "error"
    })
  ]
});

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
