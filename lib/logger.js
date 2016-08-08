let winston = require("winston");
let log_level = process.env.LOGLEVEL || "info";

winston.addColors({
  trace: "magenta",
  input: "grey",
  verbose: "cyan",
  prompt: "grey",
  debug: "green",
  info: "green",
  data: "grey",
  help: "cyan",
  warn: "yellow",
  error: "red"
});
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  level: log_level,
  prettyPrint: true,
  colorize: true,
  silent: false,
  timestamp: true
});

module.exports = winston;
