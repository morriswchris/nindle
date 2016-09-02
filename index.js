#!/usr/bin/env node

let program = require("commander");
let pkg = require("./package.json");
let configure = require("./lib/configure");
let recipes = require("./lib/recipes");
let calibre = require("./lib/calibre");

program
  .version(pkg.version);

program
  .command("run <recipe>")
  .description("Run the given <recipe>.")
  .action((recipe) => {
    calibre(recipe);
  });

program
  .command("init")
  .alias("initialize")
  .description("Build the initial config file for setting up defaults")
  .action(configure);

program
  .command("add")
  .alias("add recipe")
  .description("Add a recipe to your config")
  .action(recipes.add);

program
  .command("list")
  .alias("recipes")
  .description("List currently install recipes")
  .action(recipes.list);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
