let inquirer = require("inquirer");
let save_path = require("./home").path;
let fs = require("fs");
let winston = require("./logger");

let questions = [{
  type: "input",
  name: "output_profile",
  message: "Please specify the calibre output needed for your .mobi file:",
  default: "kindle"
}, {
  type: "input",
  name: "email",
  message: "Please enter the email you wish to receive your news to (optional):",
  default: ""
}, {
  type: "input",
  name: "server",
  message: "Enter the smtp host for your mail delivery (optional):",
  default: ""
}, {
  type: "input",
  name: "port",
  message: "Enter the smtp port for your mail delivery (optional):",
  default: "587"
}, {
  type: "input",
  name: "username",
  message: "Enter the smtp username for your mail delivery (optional):",
  default: ""
}, {
  type: "input",
  name: "passwd",
  message: "Enter the smtp password for your mail delivery (optional):",
  default: ""
}, {
  type: "input",
  name: "from",
  message: "Enter the email address that the email will be sent from (optional):",
  default: ""
}];

module.exports = () => {
  inquirer.prompt(questions).then((answers) => {
    let smtp = {
      server: answers.server,
      port: answers.port,
      username: answers.username,
      passwd: answers.password,
      from: answers.from
    };
    let config = {
      output_profile: answers.output_profile,
      email: answers.email,
      smtp: smtp
    };
    let path = `${save_path}/config.json`;

    if (!fs.existsSync(save_path)) {
      winston.info(`Making ${save_path}`);
      fs.mkdirSync(save_path);
    }

    winston.info(`Saving config to ${path}`);
    fs.writeFile(path, JSON.stringify(config, null, 4),
      "utf8", (err) => {
        if (err) {
          winston.error("There was an issue saving the config file!");
          winston.debug("Error:", err);
          process.exit(2);
        }
        winston.info("The config file was successfully created!");
      });
  });
};
