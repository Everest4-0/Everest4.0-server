
const fs = require('fs');

module.exports = {
  dev: {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "everest",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  qa: {
    HOST: "185.247.119.207",
    USER: "qauser",
    PASSWORD: "2SXzaQQu;",
    DB: "everest_qa2",
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
  },
  qa2: {
    HOST: "localhost",//"185.247.119.207",
    USER: "qauser",
    PASSWORD: "2SXzaQQu;",
    DB: "everest_qa2",
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
