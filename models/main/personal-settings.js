
const { uuid: uuidV4 } = require('uuid');
module.exports = ({ sequelize, Sequelize }) => {

  const PersonalSettings = sequelize.define("personal_settings", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID
    },
    newsCategories: {
      type: Sequelize.TEXT,
      get() {
        let values = this.getDataValue('newsCategories');
        return values ? this.getDataValue('newsCategories').split("_") : []
      },
      set(values) {
        if (values)
          this.setDataValue('newsCategories', values.join("_"))
      }
    },
    i18n: {
      type: Sequelize.STRING,
      default: 'pt'
    },
    timeZones: {
      type: Sequelize.STRING,
      default: 'UTC'
    },
    descriptions: {
      type: Sequelize.STRING,
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
        fields: ['id']
      }
    ]
  });


  PersonalSettings.associate = (models) => {
    //  PersonalSettings.belongsTo(models.User, { as: 'user', foreignKey: 'id' });
  }


  PersonalSettings.beforeCreate(data => data.id = data.userId)
  return PersonalSettings;
};