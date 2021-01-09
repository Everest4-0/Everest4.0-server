
const fs = require('fs');

module.exports = {
  dev: {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "everest_dev_2",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  qa: {
    HOST: "everest40db.mysql.database.azure.com",
    USER: "qa@everest40db",
    PASSWORD: "2wsxZAQ!",
    DB: "everest_qa",
    dialect: "mysql",

    dialectOptions: {
      ssl: {
        require: true,
        ca: fs.readFileSync(__dirname + '/../server/ssl/crt.pem')
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};
