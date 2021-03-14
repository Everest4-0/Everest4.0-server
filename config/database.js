
const fs = require('fs');

module.exports = {
  dev: {
    HOST: "localhost",
    USER: "dev",
    PASSWORD: "qasw",
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
  },
  qa2: {
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
  }
};
