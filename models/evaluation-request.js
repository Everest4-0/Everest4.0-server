
const { v4: uuid } = require('uuid')
module.exports = ({ sequelize, Sequelize }) => {

  const EvaluationRequest = sequelize.define("evaluation_request", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      default: Sequelize.UUIDV4
    },
    code: {
      type: Sequelize.STRING,
      unique: true
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      default: true
    },
    relationId: {
      type: Sequelize.INTEGER,
      default: 1
    },
    evaluationId: {
      type: Sequelize.STRING,
      default: 1
    },
    requestedId: {
      type: Sequelize.STRING,
      default: 1
    },
    requesterId: {
      type: Sequelize.STRING,
      default: 1
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  }, {
    /*indexes: [
      {
        fields: ['id', 'requesterId', 'requestedId', 'evaluationId', 'relationId']
      }
    ]*/
  }, {
    classMethods: {
      associate(models) {
        EvaluationRequest.belongsTo(models.User, {  as: 'requested', foreignKey: 'requesterId' })
        EvaluationRequest.belongsTo(models.User, {  as: 'requester', foreignKey: 'requestedId' })
        EvaluationRequest.belongsTo(models.Evaluation, {  as: 'evaluation', foreignKey: 'evaluationId' })
      },
    },
  });

  EvaluationRequest.associate = (models) => {
    // associations can be defined here
    EvaluationRequest.belongsTo(models.User, {  as: 'requested', foreignKey: 'requesterId' })
    EvaluationRequest.belongsTo(models.User, {  as: 'requester', foreignKey: 'requestedId' })
    EvaluationRequest.belongsTo(models.Evaluation, {  as: 'evaluation', foreignKey: 'evaluationId' })
  };
  EvaluationRequest.beforeCreate(evaluation => {
    evaluation.id = uuid();
  })
  return EvaluationRequest;
};