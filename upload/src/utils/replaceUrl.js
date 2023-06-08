const path = require("path");

// 去除相对路径
module.exports = (url, suffix = "") => {
  let baseUrl = path.resolve(suffix);
  return url.replace(baseUrl, "");
};
