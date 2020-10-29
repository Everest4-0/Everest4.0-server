
module.exports = ({sequelize, Sequelize}) => {

    const Role = sequelize.define("role", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      descriptions: {
        type: Sequelize.STRING,
      },
      isActive:{
          type:Sequelize.BOOLEAN,
          default:true
      },
      // Timestamps
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
    

    return Role;
  };