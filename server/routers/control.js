const router = require("express").Router();
const { logger } = require("../logger");

router.use(function handleRoute(req, res, next) {
  logger.info("got route");
  next();
});

router.get('/:pattern', (req, res) => {
  logger.info("got pattern: " + req.params.pattern);
  res.send(`<p>${req.params.pattern}</p>`)
})

module.exports = router;

