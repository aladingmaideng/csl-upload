# 上传工具

> + 项目中经常需要本地与测试环境之间传递文件，那么将其简化为npm命令
> + 与server配套使用(上传需要服务端部署一个接收服务)

## 使用

> + 下载包

```js
npm i csl-upload -g
```

> + 上传需要指定地址和路径
> + 可以选择使用配置文件的形式，会默认读取当前执行路径下的upload.config.js

```js
// upload.config.js

module.exports = {
  baseUrl: "", // 上传目录
  path: "", // 被上传目录
  url: "",// 服务地址
};
```

> + 也可以使用行间传参
>   + 行间传参的优先级高于配置文件

```js
// 同上配置文件
csl-upload -u 服务地址 -b 上传目录 -p 被上传目录
```

> + 查看最终配置

```js
csl-upload -d
```
