const Service = require("egg").Service;

class UploadService extends Service {
  async index() {
    return { status: 0, msg: "成功" };
  }
}

module.exports = UploadService;
