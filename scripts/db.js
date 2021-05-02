const mysql = require("mysql");
const config = require("../config.json");

module.exports = {
  'mysql': mysql.createConnection({host: (config.host),user: (config.user),password: (config.password),database: (config.database)})
}