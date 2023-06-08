// app/service/news.js
const Service = require("egg").Service;

class HomeService extends Service {
  async index() {
    return { a: 2 };
  }
}

module.exports = HomeService;
