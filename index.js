const PORT                     = process.env.PORT || 3000;
const express                  = require("express");
const app                      = express();
const http                     = require("http").Server(app);
const io                       = require("socket.io")(http);
const { logger, errorHandler } = require("./server/logger");
const { initializeSocketIO }   = require("./server/socketController");

const appName = process.env.APP_NAME || "application";

// Allow ips to come from proxy forward
app.enable("trust proxy");

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname + "/public/" }, errorHandler);
});

initializeSocketIO(io);

http.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
  if (typeof process.send === "function") {
    process.send("ready");
  }
});

module.exports = {
  appName
};
