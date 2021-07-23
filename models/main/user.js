
const { v4: uuid } = require('uuid')
const crypto = require('crypto');
const ModelHelper = require('../../application/datas/model.helper');
//const { PersonalSettings, PersonalData, Role } = require('../models');

module.exports = (db) => {
  let { sequelize, Sequelize, PersonalSettings, PersonalData, Role } = db
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
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    telePhone: {
      type: Sequelize.STRING
    },
    photoUrl: {
      type: Sequelize.STRING,
      default: "/avatar/default/unknow.jpg",
    },
    roles: {
      type: Sequelize.STRING,
      get() {
        let roles;
        try {
          roles = this.getDataValue('roles');
          if (roles === undefined || roles === null || roles.length === 0) return ['FREE'];

          roles = roles.split('_');
        } catch (e) {

        }
        return roles;
      },
      set(values) {
        this.setDataValue('roles', values.join('_'))
      }
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
        fields: ['id', 'roleId', 'settingId', 'dataId']
      }
    ],
    defaultScope: {
      include: [{
        model: Role,
        as: 'role'
      },
      {
        model: PersonalData,
        as: 'datas'
      },
      {
        model: PersonalSettings,
        as: 'settings'
      }]
    },
  });


  User.associate = (models) => {
    User.belongsTo(models.Role, { as: 'role', foreignKey: 'roleId' })
    User.belongsTo(models.PersonalData, { as: 'datas', foreignKey: 'dataId' });
    User.belongsTo(models.PersonalSettings, { as: 'settings', foreignKey: 'settingId' });

    User.hasMany(models.UserEvaluation, { as: 'evaluations', foreignKey: 'evaluatorId', });
    User.hasMany(models.UserEvaluation, { as: 'requester', foreignKey: 'userId', });
    User.hasMany(models.UserEvaluation, { as: 'requested', foreignKey: 'requestedId', });
    User.hasMany(models.ToDo, { as: 'todos', foreignKey: 'userId', });

    User.hasMany(models.CoachingSubscription, {as: 'coachingSubscriptions',foreignKey: 'userId'})
    User.hasMany(models.CoachingSubscription, {as: 'coachings',foreignKey: 'coachId'})

    //User.belongsToMany(models.Answer, { as: 'quizAnswers',through: "user_quiz_answers" })

    User.hasMany(models.Enrollment, { as: 'courses', foreignKey: 'userId' })
    User.belongsToMany(models.Answer,{as:'answers',through: "user_answers",foreignKey:'userId'})
    User.belongsToMany(models.TaskAnswer,{as:'taskAnswers',through: "user_task_answers"})
  }

  User.validatePassword = (user, password) => {
    let p = user.password();
    let q = User.encryptPassword(password, user.salt())
    let r = user.password() === User.encryptPassword(password, user.salt())
    return r;
  }

  User.generateSalt = function () {
    return crypto.randomBytes(16).toString('base64')
  };

  User.encryptPassword = function (plainText, salt) {
    return crypto
      .createHash('RSA-SHA256')
      .update(plainText || 'SomePrivateAndSecRetStrINg')
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
  //User.beforeCreate(user => user.firstName = user.firstName || user.email.split('@')[0].toUpperCase())
  User.beforeCreate(user => user.provider = user.provider || 'LOCAL')

  User.afterCreate(async user => {
    /*try {
      user.settings = await PersonalSettings.create({ id: user.id });
      user.datas = await PersonalData.create({ id: user.id });
      let y = await User.update({ dataId: user.id, settingId: user.id }, { where: { id: user.id } })
    } catch (e) {
      let u = e;
    }
*/
  });

  User.beforeCreate(user => user.photoUrl = user.photoUrl || "/avatar/default/unknow.jpg")
  User.beforeCreate(async user => user.code = await ModelHelper.nextCode(User))
  //User.beforeCreate(user => user.code = User.findAll({'roleId':user.roleId}).slice(-1).pop().code)
  return User
}