
const fs = require('fs');

module.exports = {
  dev: {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "password",
    DB: "everest_dev",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  qa: {
    HOST: "localhost",
    USER: "qauser",
    PASSWORD: "2SXzaQQu",
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
