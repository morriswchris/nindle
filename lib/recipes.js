let inquirer = require("inquirer");
let unzip = require("unzip");
let request = require("request");
let save_path = require("./home").path;
let fs = require("fs");
let winston = require("./logger");
let exec = require("./exec");

let question = [{
  type: "input",
  name: "output_profile",
  message: "Please specify the calibre profile needed for your .mobi file:",
  default: "kindle"
}];

module.exports = () => {

  // Fetch our repo zip
  let extract_path = `${save_path}/`;
  let zip_path = `${extract_path}master.zip`;
  let extracted_path = `${extract_path}calibre-master/recipes`;
  let final_path = `${extract_path}recipes`;
  let write_stream = fs.createWriteStream(zip_path);

  // get our calibre repo
  request.get("https://github.com/kovidgoyal/calibre/archive/master.zip")
    .pipe(write_stream)
    .on("close", () => {
      // read in our dir and build our options
      let read_stream = fs.createReadStream(zip_path);
      read_stream.pipe(unzip.Extract({
          path: extract_path
        }))
        .on("close", () => {
          //ask out question
          let files = fs.readdirSync(extracted_path);
          let choices = files.map((file) => {
            return {
              name: file.split(".")[0]
            };
          });

          let question = [{
            type: "checkbox",
            name: "recipes",
            message: "Please select all the recipes you wish to use:",
            choices: choices
          }];

          inquirer.prompt(question).then((answers) => {
            //for each recipe, move it to our config directory
            let fetch_recipes = answers.recipes;

            if (!fs.existsSync(final_path)) {
              winston.info(`Making ${final_path}`);
              fs.mkdirSync(final_path);
            }
            winston.info("files", answers.recipes);
            answers.recipes.forEach((recipe_name) => {
              let read_path =
                `${extracted_path}/${recipe_name}.recipe`;
              let write_path =
                `${final_path}/${recipe_name}.recipe`;
              let contents = fs.readFileSync(read_path).toString();
              fs.writeFileSync(write_path, contents);
            });
            winston.info("Recipies Saved!");
            // TODO: remove hack to force exit
            process.exit();
          });
        });
    });
};
