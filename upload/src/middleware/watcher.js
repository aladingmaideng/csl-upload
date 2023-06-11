const { watch, accessSync } = require("fs");
const path = require("path");
/**
 * 监听文件变化，进行上传
 */
const watcher = (conf, callback) => {
  // 时间戳
  let now = new Date().getTime();
  // 被上传路径
  const watchUrl = path.resolve(conf.path);
  watch(watchUrl, { recursive: true }, (eventType, changeUrl) => {
    let resolveChangeUrl = path.resolve(watchUrl, changeUrl);
    if (eventType === "change") {
      let changeTime = new Date().getTime();
      // change在文件内容存在时会触发两次，那么第二次就是无意义的上传，做一下防抖
      if (changeTime - now < 100) return;
      now = changeTime;
    }

    // 修改文件名和删除都会触发rename，但删除的文件stream读取不到，所以处理下
    if (eventType === "rename") {
      // 修改名称会触发两次，首次为修改前名称，第二次为修改后名称
      // 那么修改前的文件已经找不到了，所以不用处理
      try {
        accessSync(resolveChangeUrl);
      } catch (err) {
        // 文件不存在，不进行上传
        return;
      }
    }
    callback(conf, resolveChangeUrl);
  });
};

module.exports = watcher;
