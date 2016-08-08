let binary_paths = {
  "darwin": "/Applications/calibre.app/Contents/MacOS",
  "linux": "/usr/bin"
};
module.exports = () => {
  let platform = process.platform;
  try {
    return binary_paths[platform];
  } catch (e) {
    console.log(`Currently no support for '${platform}'`);
  }
};
