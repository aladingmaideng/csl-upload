const chalk = require("chalk");
const getFile = require("./middleware/getFile");
const sendFile = require("./middleware/sendFile");
const promiseReducer = require("./utils/promiseReducer");
const fetch = require("node-fetch");
const getTime = require("./utils/getTime");
const { basename } = require("path");
const watcher = require("./middleware/watcher");
async function upload(conf, oncePath) {
  const { path } = conf;
  let urlMap = [];
  if (oncePath) {
    urlMap = [oncePath];
  } else {
    urlMap = await getFile(path);
  }
  // 去除一些不需要上传的文件
  urlMap = urlMap.filter((item) => basename(item) !== ".DS_Store");
  return await promiseReducer(
    urlMap.map((url) => {
      return () => {
        console.log(chalk.yellow("开始传输：", getTime()), url);
        // 请求的参数
        const form = sendFile(conf, url);
        return fetch(conf.url, {
          method: "POST",
          body: form,
        }).then(async (res) => {
          let data = await res.json();
          if (data.status === 0) {
            console.log(chalk.green("传输成功", getTime()), url);
          }
        });
      };
    })
  )
    .then(() => {
      console.log(chalk.blue("🚀---------------传输完成-----------------🚀"));
    })
    .catch((err) => {
      console.log(chalk.red("😭---------------失败-----------------😭"));
      console.log(err);
    });
}
exports.upload = upload;
exports.default = (conf) => {
  upload(conf).then((res) => {
    if (conf.watch) {
      console.log(chalk.bgBlue("-------已开启监听模式----------"));
      conf.watch = false;
      watcher(conf, upload);
    }
  });
};
