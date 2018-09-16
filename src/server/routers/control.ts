import logger from "../logger";
import { Response, Router } from "express";
import { commands, patterns } from "../utilities/patterns";
import { SocketRequest } from "../types";

const router = Router();

router.get("/:pattern", (req: SocketRequest, res: Response) => {
  const pattern = req.params.pattern;

  if (pattern in patterns) {
    logger.info("got pattern: " + patterns[pattern]);
    req.io.emit("SET_PATTERN", patterns[pattern]);
    res.json({
      status: "200",
      message: `${patterns[pattern]} sent`
    });
    return;
  }

  if (pattern in commands) {
    logger.info("got command: " + commands[pattern]);
    req.io.emit("EXECUTE_COMMAND", commands[pattern]);
    res.status(501);
    res.json({
      status: "200",
      message: `${commands[pattern]} sent`
    });
    return;
  }

  logger.warn("invalid pattern/command: " + pattern);
  res.json({
    status: "FAILED",
    message: `${pattern} is not a valid pattern / command`,
    description: `The requested pattern / command does not exist`
  });
});

export default router;
