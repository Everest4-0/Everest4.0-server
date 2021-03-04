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
//Datas
db.ProfessionalExperience = require("./data/professional-experience")(db);
db.WorkSituation = require("./data/work-situation")(db);
db.AcademicLevel = require("./data/academic-level")(db);

//MAINS
db.Role = require("./main/role.js")(db);
db.PersonalData = require("./main/personal-data")(db);
db.PersonalSettings = require("./main/personal-settings")(db);
db.User = require("./main/user.js")(db);
db.ProfessionalExperienceData = require("./main/professional-experience-data")(db);
db.ACL = require("./main/acl.js")(db);

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
db.BudgetCategory = require("./goals/budget-category")(db);

//Quiz
db.Quiz = require("./quizes/quiz")(db);
db.Answer = require("./quizes/answer")(db);

//Course
db.Course = require("./courses/course")(db);
db.Module = require("./courses/module")(db);
db.Topic = require("./courses/topic")(db);
db.Activity = require("./courses/activity")(db);
db.Enrollment = require("./courses/enrollment")(db);
db.ActivityTask = require("./courses/activity_task")(db);
db.TaskAnswer = require("./courses/task_answer")(db);

//coaching
db.CoachingDuration = require("./coaching/coaching_duration")(db);
db.CoachingGoal = require("./coaching/coaching_goal")(db);
db.CoachingSubscribe = require("./coaching/coaching_subscribe")(db);

db.Op = Sequelize.Op;
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.updateOrCreate = async (model, where, newItem) => {
  // First try to find the record
  return model
    .findOne({ where: where })
    .then(function (foundItem) {
      if (!foundItem) {
        // Item not found, create a new one
        return model
          .create(newItem)
          .then((item) => {
            return  item;
          })
      }
      // Found an item, update it
      return model
        .update(newItem, { where: where })
        .then((item) => {
          return  item
        });
    })
  }

module.exports = db;