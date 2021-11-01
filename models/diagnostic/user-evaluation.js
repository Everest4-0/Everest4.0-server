
const { v4: uuid } = require('uuid')
module.exports = ({ sequelize, Sequelize, defaultKeys, }) => {

  const UserEvaluation = sequelize.define("user_evaluation", {
    ...defaultKeys,
    points: {
      type: Sequelize.INTEGER
    },
    descriptions: {
      type: Sequelize.STRING,
    },
  });
  UserEvaluation.associate = (models) => {

    UserEvaluation.belongsTo(models.Evaluation, { as:'evaluation', foreignKey: 'evaluationId', });
    UserEvaluation.belongsTo(models.User, { as:'requester', foreignKey: 'requesterId', });
    UserEvaluation.belongsTo(models.User, { as:'requested',foreignKey: 'requestedId', });
    UserEvaluation.belongsTo(models.EvaluationRequest, { as:'request',foreignKey: 'requestId', });
  }
  UserEvaluation.beforeCreate(evaluation => {
    evaluation.id = uuid();
  })
  return UserEvaluation;
};