

const { v4: uuid } = require('uuid')
const crypto = require('crypto');
const ModelHelper = require('../../application/datas/model.helper');

module.exports = ({ sequelize, Sequelize }) => {

  const UserAnswer = sequelize.define("user_answers", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      default: Sequelize.UUIDV4
    },
    descriptions: {
      type: Sequelize.STRING,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      default: true
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  }, {
    indexes: [
      {
        fields: ['id', 'moduleId']
      }
    ]
  });


  UserAnswer.associate = (models) => {
    UserAnswer.hasMany(models.Activity, { as: 'activities', foreignKey: 'topicId' })
    UserAnswer.belongsTo(models.User, { as: 'user', foreignKey: 'moduleId' })
  }

  UserAnswer.beforeCreate(course => course.id = uuid())
  UserAnswer.beforeCreate(async course => course.code = await ModelHelper.nextCode(Topic))

  return Topic;
};