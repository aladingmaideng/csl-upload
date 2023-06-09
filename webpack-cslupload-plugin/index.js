const validate = require("./methods/validate");
const fetch = require("node-fetch");
const chalk = require("chalk");
const FormData = require("form-data");
const promiseReducer = require("./methods/promiseReducer");
const { dirname, join, basename } = require("path");
const PLUGIN_NAME = "webpack-upload-plugin";

function uploadPlugin(config) {
  validate(config);
  this.config = config;
}

uploadPlugin.prototype.apply = function (compiler) {
  const { baseUrl, url } = this.config;
  const { webpack } = compiler;
  const { Compilation } = webpack;
  compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
    compilation.hooks.processAssets.tapPromise(
      {
        name: PLUGIN_NAME,
        stage: Compilation.PROCESS_ASSETS_STAGE_REPORT, // 分析上传
      },
      (assets) => {
        return promiseReducer(
          Object.entries(assets).map(([pathname, source]) => {
            return () => {
              console.log(chalk.yellow("开始传输："), pathname);
              const form = new FormData();
              form.append("baseUrl", join(baseUrl, dirname(pathname), "/"));
              form.append("file", source.buffer(), basename(pathname));
              return fetch(url, {
                method: "POST",
                body: form,
              }).then(async (res) => {
                let data = await res.json();
                if (data.status === 0) {
                  console.log(chalk.green("传输成功"), pathname);
                }
              });
            };
          })
        )
          .then(() => {
            console.log(
              chalk.blue("🚀---------------传输完成-----------------🚀")
            );
          })
          .catch((err) => {
            console.log(chalk.red("😭---------------失败-----------------😭"));
            throw err;
          });
      }
    );
  });
};
module.exports = uploadPlugin;
