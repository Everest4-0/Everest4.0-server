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
  });


  Course.associate = (models) => {
    Course.hasMany(models.Module, { as: 'modules', foreignKey: 'courseId' })
  }
  
  Course.beforeCreate(course => course.id = uuid())
  Course.beforeCreate(async course => course.code = await ModelHelper.nextCode(Course))

  return Course;
};