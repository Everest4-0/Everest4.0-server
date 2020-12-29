
const { v4: uuid } = require('uuid')
const crypto = require('crypto');
const ModelHelper = require('../../application/datas/model.helper');

module.exports = ({ sequelize, Sequelize }) => {

  const Course = sequelize.define("courses", {
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
      type: Sequelize.TEXT,
    },
    cover: {
      type: Sequelize.TEXT,
      set(value) {
        if (value.length < 255)
          this.setDataValue('cover', value)
      }
    },
    language: {
      type: Sequelize.STRING,
    },
    duration: {
      type: Sequelize.INTEGER,
    },
    level: {
      type: Sequelize.INTEGER,
    },
    roles:{
      type: Sequelize.STRING,
      set(values=[]) {
        this.setDataValue('roles', values.join('_'))
      },
      get() {
        let roles;
        try {
          roles = this.getDataValue('roles');
          if (roles === undefined || roles === null || roles.length === 0) return [];

          roles = roles.split('_');
        } catch (e) {

        }
        return roles;
      },

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
        fields: ['id', 'userId']
      }
    ]
  });

  Course.associate = (models) => {
    Course.hasMany(models.Module, { as: 'modules', foreignKey: 'courseId' })
    Course.belongsToMany(models.Evaluation, { as: 'evaluations', through: "course_evaluations", foreignKey: 'evaluationId' })
    Course.hasMany(models.Enrollment, { as: 'enrollments', foreignKey: 'courseId' })
    Course.belongsTo(models.User, { as: 'user', foreignKey: 'userId' })
  }

  Course.beforeCreate(course => course.id = uuid())
  Course.beforeCreate(async course => course.code = await ModelHelper.nextCode(Course))

  return Course;
};