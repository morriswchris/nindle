let inquirer = require("inquirer");
let wget = require("wget");
let home_path = require("./home").path;
let config = require(`${home_path}/config.json`);
let save_path = `${config.recipes_path}`;
let fs = require("fs");
let winston = require("./logger");
let exec = require("./exec");
let host_path = "https://raw.githubusercontent.com/kovidgoyal/calibre/master/recipes";

let question = [{
  type: "input",
  name: "recipe_name",
  message: "Please specify the calibre recipie you wish to add:"
}];

const add = () => {
  inquirer.prompt(question).then((answers) => {
    // get our calibre recipe from the repo
    let recipe = `${host_path}/${answers.recipe_name}.recipe`;
    let save_recipe = `${save_path}/${answers.recipe_name}.recipe`;
    // make our recipies dir if not exist
    if (!fs.existsSync(save_path)) {
      winston.info(`Making ${save_path}`);
      fs.mkdirSync(save_path);
    }
    let download = wget.download(recipe, save_recipe);
    download.on("error", (err) => {
      winston.error(`Failed to download "${answers.recipe_name}"!`);
      winston.debug(err);
    });
    download.on("end", (output) => {
      winston.info(`${answers.recipe_name} saved!`);
    });
    download.on("progress", (progress) => {
      // code to show progress bar
    });
  });
};

const list = () => {
  // read in our recipes dir and list files
  let recipe_files = fs.readdirSync(save_path);
  winston.debug("recipes found: ", recipe_files);
  recipe_files.forEach((recipe_name) => {
    console.log(`- ${recipe_name.split(".")[0]}`);
  });
};


module.exports = {
  add: add,
  list: list
};
