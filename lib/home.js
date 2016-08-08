let home_dir = process.env.HOME || process.env.USERPROFILE;
module.exports = {
  dir: home_dir,
  path: `${home_dir}/.nindle`
};
