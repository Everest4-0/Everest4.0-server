
const { v4: uuid } = require('uuid')
module.exports = ({ sequelize, Sequelize }) => {

  const UserEvaluation = sequelize.define("user_evaluation", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      default: Sequelize.UUIDV4
    },
    points: {
      type: Sequelize.INTEGER
    },
    descriptions: {
      type: Sequelize.STRING,
    },
    requestId: {
      type: Sequelize.STRING,
    },
    requesterId: {
      type: Sequelize.STRING,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      default: true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
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