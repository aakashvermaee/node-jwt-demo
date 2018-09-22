const map = new Map();

map.set("http", require("http"));
map.set("url", require("url"));
map.set("jwt", require("jsonwebtoken"));

global.getPackage = (packageName) => {
  if (map.has(packageName)) {
    return map.get(packageName);
  } else {
    const errMsg = `Could not find '${packageName}' package.`;
    throw new Error(errMsg);
  }
};
