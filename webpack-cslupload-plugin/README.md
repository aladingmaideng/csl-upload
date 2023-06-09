# 上传插件

## 使用场景

> + 将webpack构建产物推送到服务器指定目录

## 如何使用

### 前置

> + 首先需要在服务器上启动一个服务，用来接收和放置文件

### 使用

> + 下载

```js
npm i webpack-cslupload-plugin -D
```

```js
webpack.config.js
const UploadPlugin = require("webpack-cslupload-plugin");

const path = require("path");
module.exports = {
    ...
    plugins: [
      new UploadPlugin({
        baseUrl: "存放目录,如/home/",
        url: "服务地址,如http://xxx:8888/",
      }),
    ],
  };
```