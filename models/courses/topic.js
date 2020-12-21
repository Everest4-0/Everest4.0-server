
module.exports = ({ sequelize, Sequelize }) => {

  const Topic = sequelize.define("topics", {
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
        fields: ['id', 'moduleId']
      }
    ]
  });


  Topic.associate = (models) => {
    Topic.hasMany(models.Activity, { as: 'activities', foreignKey: 'topicId' })
    Topic.belongsTo(models.Module, { as: 'module', foreignKey: 'moduleId' })
  }

  Topic.beforeCreate(course => course.id = uuid())
  Topic.beforeCreate(async course => course.code = await ModelHelper.nextCode(Topic))

  return Topic;
};