
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
    isActive: {
      type: Sequelize.BOOLEAN,
      defoult: true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  }, {
    indexes: [
      {
        fields: ['id', 'evaluationId', 'userId', 'evaluatorId']
      }
    ]
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        UserEvaluation.belongsTo(models.Evaluation, { foreignKey: 'evaluationId', });
        UserEvaluation.belongsTo(models.User, { foreignKey: 'userId', });
        UserEvaluation.belongsTo(models.User, { foreignKey: 'evaluatorId', });
      },
    },
  });
  UserEvaluation.associate = (models) => {

    UserEvaluation.belongsTo(models.Evaluation, { foreignKey: 'evaluationId', });
    UserEvaluation.belongsTo(models.User, { foreignKey: 'userId', });
    UserEvaluation.belongsTo(models.User, { foreignKey: 'evaluatorId', });
  }
  UserEvaluation.beforeCreate(evaluation => {
    evaluation.id = uuid();
  })
  return UserEvaluation;
};