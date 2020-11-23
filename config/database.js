module.exports = {
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
  };  
  /*{HOST: "localhost",
    USER: "QA",
    PASSWORD: "everest40server-mysqldbserver",
    DB: "everest_QA",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }}*/