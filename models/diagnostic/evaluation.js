
const { v4: uuid } = require('uuid')
module.exports = ({ sequelize, Sequelize }) => {

  const Evaluation = sequelize.define("evaluation", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      default: Sequelize.UUIDV4
    },
    code: {
      type: Sequelize.STRING,
      unique: true
    },
    name: {
      type: Sequelize.STRING,
      unique: true
    },
    descriptions: {
      type: Sequelize.STRING,
    },
    group: {
      type: Sequelize.STRING,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      default: true
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
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