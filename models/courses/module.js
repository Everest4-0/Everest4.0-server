
module.exports = ({ sequelize, Sequelize }) => {

  const Module = sequelize.define("modules", {
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
        fields: ['id', 'courseId']
      }
    ]
  });

  Module.associate = (models) => {
    Module.hasMany(models.Topic, { as: 'topics', foreignKey: 'moduleId' })
    Module.belongsTo(models.Course, { as: 'course', foreignKey: 'courseId' })
  }

  Module.beforeCreate(course => course.id = uuid())
  Module.beforeCreate(async course => course.code = await ModelHelper.nextCode(Module))

  return Module;
};