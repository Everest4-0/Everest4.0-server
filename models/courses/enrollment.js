

const { v4: uuid } = require('uuid')
const crypto = require('crypto');
const ModelHelper = require('../../application/datas/model.helper');

module.exports = ({ sequelize, Sequelize }) => {

  const Enrollment = sequelize.define("enrollments", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      default: Sequelize.UUIDV4
    },
    code: {
      type: Sequelize.STRING,
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
        fields: ['id', 'userId','courseId','activityId']
      }
    ]
  });


  Enrollment.associate = (models) => {
    Enrollment.belongsTo(models.Activity, { as: 'lastActivity', foreignKey: 'activityId' })
    Enrollment.belongsTo(models.User, { as: 'user', foreignKey: 'userId' })
    Enrollment.belongsTo(models.Course, { as: 'course', foreignKey: 'courseId' })
  }

  Enrollment.beforeCreate(enrollment => enrollment.id = uuid())
  Enrollment.beforeCreate(async enrollment => enrollment.code = await ModelHelper.nextCode(Enrollment/*, enrollment.course.code*/))

  return Enrollment;
};