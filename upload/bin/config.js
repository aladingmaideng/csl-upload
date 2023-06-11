//配置文件
module.exports = {
  url: {
    option: "-u, --url <url>",
    description: "远程服务端接口地址",
    default: "http://cslcd.bcc-szzj.baidu.com:8999/",
  },
  baseUrl: {
    option: "-b, --baseUrl <dir>",
    description: "上传至远程服务器的根目录",
    default: "/home/map/test/",
  },
  path: {
    option: "-p, --path <dir>",
    description: "本地目录,需要被上传的目录",
    default: "src",
  },
  detail: {
    option: "-d, --detail",
    description: "查看配置详情",
  },
  watch: {
    option: "-w, --watch",
    description: "开启监听模式 暂不支持：开发中~",
  },
};
