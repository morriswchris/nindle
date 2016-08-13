let home_path = require("./home").path;
let winston = require("./logger");
let bin_dir = require("./system")();
let exec = require("./exec");
let fs = require("fs");

let calibre = (recipe_name) => {
  let config_path = `${home_path}/config.json`;
  try {
    fs.statSync(config_path);
  } catch (e) {
    winston.info("Config Error");
    console.log("Please run `nindle init` prior to running a recipe");
    winston.debug(e);
    process.exit(1);
  }
  winston.info(`loading config from ${config_path}`);
  let config = require(config_path);
  let out_path = config.out_dir;
  let subject_prefix = "News";
  let content_prefix = "News";
  let output_prefix = "News";
  let date_file = "2016_01_01";
  let date_str = "2016/01/01";

  winston.debug("Config:", config);
  let output_file =
    `${out_path}/${config.output_prefix}_${date_file}.mobi`;
  let ebook_convert_binary = "ebook-convert";
  let ebook_meta_binary = "ebook-meta";
  let calibre_smtp = "calibre-smtp";
  let recipe_path = (recipe) => {
    return `${config.recipes_path}/${recipe}.recipe`;
  };
  let recipe = recipe_path(recipe_name);
  exec(
    `${bin_dir}/${ebook_convert_binary} "${recipe}" "${output_file}" --output-profile "${config.output_profile}"`
  );
  exec(`${bin_dir}/${ebook_meta_binary} -a "${date_str}" "${output_file}"`);
  // if we have smtp settings and emails, we should send
  if (config.smtp && config.smtp.server && config.email) {
    exec(
      `${bin_dir}${calibre_smtp} --attachment "${output_file}" --relay "${config.smtp.server}" --port "${config.smtp.port}" --username "${config.smtp.username}" --password "${config.smtp.passwd}"  --encryption-method TLS --subject "${subject_prefix} (${date_str})" "${config.smtp.from}" "${config.email}"  "${config.content_prefix} (${date_str})"`
    );
  }
};

module.exports = calibre;
