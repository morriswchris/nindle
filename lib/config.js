let winston = require("./logger");
let home_path = require("./home").path;

module.exports = () => {
  let config_path = `${home_path}/config.json`;
  try {
    return require(config_path);
  } catch (e) {
    winston.info("Config Error");
    winston.error("Please run `nindle init` prior to running a recipe");
    winston.debug(e);
    process.exit(1);
  }
}
