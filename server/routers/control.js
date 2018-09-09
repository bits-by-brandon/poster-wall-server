const router = require("express").Router();
const { commands, patterns } = require("../utilities/patterns");
const { logger } = require("../logger");

router.get("/:pattern", (req, res) => {
  const pattern = req.params.pattern;

  if (patterns.includes(pattern)) {
    logger.info("got pattern: " + pattern);
    req.io.emit("SET_PATTERN", pattern);
    res.send(`<p>${pattern} sent</p>`);
    return;
  }

  if (commands.includes(pattern)) {
    logger.info("got command: " + pattern);
    req.io.emit("COMMAND", pattern);
    res.send(`<p>${pattern} sent</p>`);
    return;
  }

  logger.warn("invalid pattern/command: " + pattern);
  res.send(`<p>${pattern} is not a valid command</p>`);
});

module.exports = router;
