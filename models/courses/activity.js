
const { v4: uuid } = require('uuid')
const crypto = require('crypto');
const ModelHelper = require('../../application/datas/model.helper');

module.exports = ({ sequelize, Sequelize }) => {

  const Activity = sequelize.define("activitis", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      default: Sequelize.UUIDV4
    },
    code: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    descriptions: {
      type: Sequelize.STRING,
    },
    duration: {
      type: Sequelize.INTEGER,
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
        fields: ['id', 'topicId']
      }
    ]
  });

  Activity.associate = (models) => {
    Activity.belongsTo(models.Topic, { as: 'topic', foreignKey: 'topicId' })
  }

  Activity.beforeCreate(course => course.id = uuid())
  Activity.beforeCreate(async course => course.code = await ModelHelper.nextCode(Activity))

  return Activity;
};