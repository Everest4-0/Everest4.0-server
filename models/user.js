
const { v4: uuid } = require('uuid')
const crypto = require('crypto')

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
    telePhone: {
      type: Sequelize.STRING
    },
    photoUrl: {
      type: Sequelize.STRING,
      default:"/avatar/default/unknow.jpg",
    },
    apikey: {
      type: Sequelize.STRING,
      unique: true
    },

    password: {
      type: Sequelize.STRING,
      get() {
        return () => this.getDataValue('password')
      }
    },
    salt: {
      type: Sequelize.STRING,
      get() {
        return () => this.getDataValue('salt')
      }
    },

    isActive: {
      type: Sequelize.BOOLEAN,
      default: true
    },
    provider: {
      type: Sequelize.BOOLEAN,
      default: 'LOCAL'
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
  });
  User.associate = (models) => {
    User.belongsTo(models.Role, { as:'role',foreignKey: 'roleId' })
    User.hasMany(models.UserEvaluation, { as: 'evaluations', foreignKey: 'evaluatorId', });
    User.hasMany(models.UserEvaluation, { as: 'requester', foreignKey: 'userId', });
    User.hasMany(models.UserEvaluation, { as: 'requested', foreignKey: 'requestedId', });
    
  }

  User.validatePassword = (user, password) => {
    let p= user.password() ;
    let q= User.encryptPassword(password, user.salt())
    let r= user.password() === User.encryptPassword(password, user.salt())
    return r;
  }
  User.generateSalt = function () {
    return crypto.randomBytes(16).toString('base64')
  };
  User.encryptPassword = function (plainText, salt) {
    return crypto
      .createHash('RSA-SHA256')
      .update(plainText||'SomePrivateAndSecRetStrINg')
      .update(salt)
      .digest('hex')
  }
  const setSaltAndPassword = user => {
    if (user.changed('password') || user.password() === undefined) {
      user.salt = User.generateSalt()
      user.password = User.encryptPassword(user.password(), user.salt())
    }
  }

  User.beforeCreate(setSaltAndPassword)
  User.beforeUpdate(setSaltAndPassword)
  User.beforeCreate(user => user.id = uuid())
  User.beforeCreate(user => user.roleId = user.roleId || 'FREE')
  User.beforeCreate(user => user.firstName = user.firstName || user.email.split('@')[0].toUpperCase())
  User.beforeCreate(user => user.provider = user.provider || 'LOCAL')

  User.beforeCreate(user => user.photoUrl = user.photoUrl || 'https://localhost:9800/default/unknow.jpg')
  //User.beforeCreate(user => user.code = User.findAll({'roleId':user.roleId}).slice(-1).pop().code)
  return User
}