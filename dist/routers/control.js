"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("../logger");
var express_1 = require("express");
var patterns_1 = require("../utilities/patterns");
var router = express_1.Router();
router.get("/:pattern", function (req, res) {
    var pattern = req.params.pattern;
    if (pattern in patterns_1.patterns) {
        logger_1.default.info("got pattern: " + patterns_1.patterns[pattern]);
        req.io.emit("SET_PATTERN", patterns_1.patterns[pattern]);
        res.json({
            status: "200",
            message: patterns_1.patterns[pattern] + " sent"
        });
        return;
    }
    if (pattern in patterns_1.commands) {
        logger_1.default.info("got command: " + patterns_1.commands[pattern]);
        req.io.emit("EXECUTE_COMMAND", patterns_1.commands[pattern]);
        res.json({
            status: "200",
            message: patterns_1.commands[pattern] + " sent"
        });
        return;
    }
    logger_1.default.warn("invalid pattern/command: " + pattern);
    res.status(404);
    res.json({
        status: "404",
        message: pattern + " is not a valid pattern / command",
        description: "The requested pattern / command does not exist"
    });
});
exports.default = router;
//# sourceMappingURL=control.js.map