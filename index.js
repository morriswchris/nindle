let program = require("commander");
let pkg = require("./package.json");
let configure = require("./lib/configure");
let calibre = require("./lib/calibre");

program
  .version(pkg.version)
  .command("<recipe>", "Run the given <recipe>.")
  .action((recipe) => {
    calibre(recipe);
  })
  .command("initialize",
    "creates your default install config to be able to run simple commands")
  .alias("init")
  .action(configure);

program.parse(process.argv);
