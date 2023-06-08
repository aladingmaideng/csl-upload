const path = require("path");
const { readdir, stat } = require("fs/promises");
const getFileToAry = async function (baseUrl) {
  const pathUrl = path.resolve(baseUrl);
  const ary = [];
  // 获取文件列表
  const dirs = await readdir(pathUrl);
  await Promise.all(
    dirs.map(async (dir) => {
      // 拼接路径
      let url = path.join(pathUrl, dir);
      // 获取文件信息
      let file = await stat(url);
      if (file.isFile()) {
        //如果是文件，将目录添加到map里
        ary.push(url);
      } else {
        const childAry = await getFileToAry(url);
        // 合并
        ary.push(...childAry);
      }
    })
  );
  return ary;
  // 获取目录
  // 获取目录下文件
  //  如果是目录，再次遍历
  //  如果是文件，将内容放到map里
};
module.exports = getFileToAry;
