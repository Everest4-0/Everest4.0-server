
const { uuid: uuidV4 } = require('uuid');
module.exports = ({sequelize, Sequelize}) => {

    const Role = sequelize.define("role", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING,
        unique: true 
      },
      descriptions: {
        type: Sequelize.STRING,
      },
      isActive:{
          type:Sequelize.BOOLEAN,
          defoult:true
      },
      // Timestamps
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
    return Role;
  };