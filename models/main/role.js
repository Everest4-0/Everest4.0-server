
module.exports = ({sequelize, Sequelize, defaultKeys}) => {

    const Role = sequelize.define("role", {
      ...defaultKeys,
      descriptions:Sequelize.STRING,
    });    

    return Role;
  };