const path = require("path");
module.exports = (appInfo) => {
  return {
    // cookie
    keys: "cuishoulong",
    view: {
      defaultViewEngine: "nunjucks",
      mapping: {
        ".tpl": "nunjucks",
        ".html": "nunjucks",
      },
    },
    multipart: {
      mode: "stream",
      fileSize: "500mb",
      // mode: "file",
    },
    security: {
      csrf: {
        enable: false,
      },
      domainWhiteList: ["*"], // 白名单
    },
  };
};
