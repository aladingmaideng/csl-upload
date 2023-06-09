const { validate } = require("schema-utils");
const schema = {
  type: "object",
  properties: {
    url: { description: "服务器地址", type: "string" },
    baseUrl: { description: "服务器放置路径", type: "string" },
  },
};
// 校验传入参数类型，类型不对则抛出异常
module.exports = (config) => {
  validate(schema, config, {
    name: "webpack-cslupload-plugin",
  });
};
