module.exports = ({ sequelize, Sequelize, defaultKeys }) => {

  const PersonalSettings = sequelize.define("personal_settings", {
    ...defaultKeys,
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
  });


  PersonalSettings.associate = (models) => {
    //  PersonalSettings.belongsTo(models.User, { as: 'user', foreignKey: 'id' });
  }


  PersonalSettings.beforeCreate(data => data.id = data.userId)
  return PersonalSettings;
};