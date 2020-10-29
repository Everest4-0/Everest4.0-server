module.exports = ({sequelize, Sequelize}) => {

    const User = sequelize.define("user", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      apikey: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return User;
  };