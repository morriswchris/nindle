//actual program
let exec_sync = require("child_process").execSync;
let winston = require("./logger");

module.exports = (cmd) => {
  winston.info(`Running Command: ${cmd}\n`);
  return exec_sync(cmd, {
    stdio: [0, 1, 2]
  });
};
