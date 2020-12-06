const dbConfig = require("../config/database.js").dev;

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.js")(db);
db.Role = require("./role.js")(db);
db.ACL = require("./acl.js")(db);
//Diagnostics
db.Evaluation = require("./diagnostic/evaluation")(db);
db.UserEvaluation = require("./diagnostic/user-evaluation")(db);
db.EvaluationRequest = require("./diagnostic/evaluation-request")(db);

//Goals
db.Goal = require("./goals/goal")(db);
db.Task = require("./goals/task")(db);
db.Budget = require("./goals/budget")(db);
db.ToDo = require("./goals/todo")(db);
db.PartialGoal = require("./goals/partial-goal")(db);


db.Op = Sequelize.Op;
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
module.exports = db;