module.exports = ({ sequelize, Sequelize,defaultKeys }) => {

  const File = sequelize.define("files", {
    ...defaultKeys,
    name: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    path: {
      type: Sequelize.STRING,
    },
  });


  File.associate = (models) => {
    File.belongsTo(models.User, { as: 'user', foreignKey: 'userId' })
  }
  
  return File;
};