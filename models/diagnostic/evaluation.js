
const { v4: uuid } = require('uuid')
module.exports = ({ sequelize, Sequelize, defaultKeys,}) => {

  const Evaluation = sequelize.define("evaluation", {
    ...defaultKeys,
    code: {
      type: Sequelize.STRING,
      unique: true
    },
    name: {
      type: Sequelize.STRING,
      unique: true
    },
    descriptions: {
      type: Sequelize.TEXT,
    },
    group: {
      type: Sequelize.STRING,
    },
    ...defaultKeys,
  },{
    classMethods: {
      associate(models) {
        // associations can be defined here
     //   Evaluation.hasMany(models.UserEvaluation, { foreignKey: 'evaluationId', });
      },
    },
  });
  Evaluation.associate = (models) => {
    Evaluation.hasMany(models.UserEvaluation, {as:'userEvaluations', foreignKey: 'evaluationId' })

    Evaluation.belongsToMany(models.Course,{as:'courses',through: "course_evaluations",foreignKey:'courseId'})
  }

  Evaluation.beforeCreate(evaluation =>evaluation.id = uuid())
  return Evaluation;
};