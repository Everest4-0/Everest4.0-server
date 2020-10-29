
const { uuid: uuidV4 } = require('uuid');
module.exports = ({ sequelize, Sequelize }) => {

  const User = sequelize.define("user", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID
    },
    username: {
      type: Sequelize.STRING,
      unique: true
    },
    code: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    apikey: {
      type: Sequelize.BOOLEAN,
      unique: true
    },
    roleId:{
      type: Sequelize.STRING,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defoult: true
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
  User.associate =(models)=>{
    User.belongsTo(models.Role,{as:'role',foreignKey:'roleId'})
  }
  User.beforeCreate(user => user.id = uuid());
  return User;
};