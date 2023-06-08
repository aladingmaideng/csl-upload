const { Controller } = require("egg");
const fs = require("fs");
const path = require("path");

function makep(dir) {
  let paths = dir.split("/");
  for (let i = 1; i < paths.length; i++) {
    let newPath = paths.slice(0, i).join("/");
    if (newPath && !fs.existsSync(newPath)) {
      // 目录不存在，创建目录
      fs.mkdirSync(newPath);
    }
  }
}

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    let stream = await ctx.getFileStream();
    // 拼接路径
    const baseName = path.resolve(
      stream.fields.baseUrl,
      path.basename(stream.filename)
    );
    // 如果目录不存在，依次创建目录
    makep(stream.fields.baseUrl);
    // // 创建可写流
    const ws = fs.createWriteStream(baseName);
    // 边读边写
    const response = await new Promise((resolve, reject) => {
      stream.pipe(ws).on("close", () => {
        resolve({
          status: 0,
          msg: "success",
        });
      });
    });
    // 写完返回结果
    ctx.body = response;
  }
  async upload() {
    const { ctx } = this;
    await ctx.render("index.html");
  }
}
module.exports = HomeController;
