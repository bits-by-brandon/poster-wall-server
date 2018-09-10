const router = require("express").Router();
const { commands, patterns } = require("../utilities/patterns");
const { logger } = require("../logger");

router.get("/:pattern", (req, res) => {
  const pattern = req.params.pattern;

  if (pattern in patterns) {
    logger.info("got pattern: " + patterns[pattern]);
    req.io.emit("SET_PATTERN", patterns[pattern]);
    res.send(`<p>${patterns[pattern]} sent</p>`);
    return;
  }

  if (pattern in commands) {
    logger.info("got command: " + commands[pattern]);
    req.io.emit("EXECUTE_COMMAND", commands[pattern]);
    res.status(501);
    res.send(`<p>${commands[pattern]} sent</p>`);
    return;
  }

  logger.warn("invalid pattern/command: " + pattern);
  res.send(`<p>${pattern} is not a valid command</p>`);
});

module.exports = router;
