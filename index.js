let bin_dir = require("./lib/system")();
let exec = require("./lib/exec");
let recipe = "/Users/morriswchris/repos/nindle/recipies/endgadget.recipe";
let out_directory = "/Users/morriswchris/repos/nindle/";
let output_profile = "kindle";
let emails = ["morris.w.chris@kindle.com"];
let smtp = {
  server: "",
  port: "",
  user: "",
  passwd: "",
  from: ""
};
let subject_prefix = "";
let content_prefix = "";
let output_prefix = "News";
let date_file = "2016_01_01";
let date_str = "2016/01/01";
let output_file = `${out_directory}/${output_prefix}_${date_file}.mobi`;
let ebook_convert_binary = "ebook-convert";
let ebook_meta_binary = "ebook-meta";
let calibre_smtp = "calibre-smtp";


exec(
  `${bin_dir}/${ebook_convert_binary} "${recipe}" "${output_file}" --output-profile "${output_profile}"`
);
exec(`${bin_dir}/${ebook_meta_binary} -a "${date_str}" "${output_file}"`);
exec(
  `${bin_dir}/${calibre_smtp} --attachment "${output_file}" --relay "${smtp.host}" --port "${smpt.port}" --username "${smtp.username}" --password "${smtp.passwd}"  --encryption-method TLS --subject "${subject_prefix} (${date_str})" "${smpt.from}" "${emails[0]}"  "${content_prefix} (${date_str})`
);
