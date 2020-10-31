
const { v4: uuid } = require('uuid')


module.exports = ({ sequelize, Sequelize }) => {

  const User = sequelize.define("user", {
    id: {
      
      primaryKey: true,
      type: Sequelize.UUID,
      default: Sequelize.UUIDV4
    },
    username: {
      type: Sequelize.STRING,
      unique: true
    },
    code: {
      type: Sequelize.STRING
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    othersName: {
      type: Sequelize.STRING
    },
    fullName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    photoUrl: {
      type: Sequelize.STRING,
      unique: true
    },
    apikey: {
      type: Sequelize.STRING,
      unique: true
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      default: true
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  }, {
    indexes: [
        {
            fields: ['id', 'roleId']
        }
    ]
},{
    classMethods: {
      associate(models) {
        // associations can be defined here
        User.belongsTo(models.Role, { foreignKey: 'roleId', });
      },
    },
  });
  User.associate = (models) => {
    
    User.belongsTo(models.Role, { foreignKey: 'roleId' })
  }

  User.associate = (models) => {
    // associations can be defined here
    User.belongsTo(models.Role, { foreignKey: 'roleId' });
};
  User.beforeCreate(user => user.id = uuid())
  User.beforeCreate(user => user.roleId = user.roleId || 'FREE')
  //User.beforeCreate(user => user.code = User.findAll({'roleId':user.roleId}).slice(-1).pop().code)
  return User
}