
module.exports = ({ sequelize, Sequelize }) => {

  const File = sequelize.define("files", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    path: {
      type: Sequelize.STRING,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      default: true
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });


  File.associate = (models) => {
    File.belongsTo(models.User, { as: 'user', foreignKey: 'userId' })
  }

  return File;
};