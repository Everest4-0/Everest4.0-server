const { v4: uuid } = require('uuid')

module.exports = ({ sequelize, Sequelize }) => {

  const File = sequelize.define("files", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      default: Sequelize.UUIDV4
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

  File.beforeCreate(file => file.id = uuid())
  
  return File;
};