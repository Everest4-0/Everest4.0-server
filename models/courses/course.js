
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
  Course.beforeCreate(course => course.id = uuid())
  Course.beforeCreate(async course => course.code = await ModelHelper.nextCode(Course))
  //User.beforeCreate(user => user.code = User.findAll({'roleId':user.roleId}).slice(-1).pop().code)

  return Course;
};