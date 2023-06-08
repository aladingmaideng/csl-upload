const FormData = require("form-data");
const fs = require("fs");
const { dirname, join, basename } = require("path");
const replaceUrl = require("../utils/replaceUrl");

module.exports = (conf, fileUrl) => {
  const form = new FormData();
  const { baseUrl } = conf;
  // 去除相对目录
  const url = replaceUrl(fileUrl, conf.path);
  // 累加目录,添加到上传路径
  form.append("baseUrl", join(baseUrl, dirname(url), "/"));
  form.append("file", fs.createReadStream(fileUrl));
  return form;
};
