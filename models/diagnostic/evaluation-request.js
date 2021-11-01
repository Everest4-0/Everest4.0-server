
const { v4: uuid } = require('uuid')
module.exports = ({ sequelize, Sequelize, defaultKeys, }) => {

  const EvaluationRequest = sequelize.define("evaluation_request", {
    ...defaultKeys,
    code: {
      type: Sequelize.STRING,
      unique: true
    },
    descriptions: {
      type: Sequelize.STRING
    },
    relationId: {
      type: Sequelize.INTEGER,
      default: 1
    }
  });

  EvaluationRequest.associate = (models) => {
    // associations can be defined here
    EvaluationRequest.belongsTo(models.User, { as: 'requested', foreignKey: 'requestedId' })
    EvaluationRequest.belongsTo(models.User, { as: 'requester', foreignKey: 'requesterId' })
    EvaluationRequest.hasMany(models.UserEvaluation, { as: 'evaluations', foreignKey: 'requestId' })
  };
  EvaluationRequest.beforeCreate(evaluation => {
    evaluation.id = uuid();
  })
  return EvaluationRequest;
};