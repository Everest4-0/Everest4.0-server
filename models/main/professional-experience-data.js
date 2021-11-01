
module.exports = ({ sequelize, Sequelize, defaultKeys }) => {

  const ProfessionalExperienceData = sequelize.define("professional_experience_data", {
    ...defaultKeys,
    name: {
      type: Sequelize.STRING,
      get() {
        return () => {
          let str = '';
          if (this.from !== 0 && this.to !== 0) {
            str += 'Entre ' + this.from + ' à'
            str += this.to + ' anos'
          } else if (this.from !== 0 && this.to === 0) {
            str += 'Mais de ' + this.from + ' anos'
          } else {
            str += 'Menos de ' + this.to + ' anos'
          }

          return str;

        }
      }
    },
    descriptions: {
      type: Sequelize.STRING,
    },
    from: {
      type: Sequelize.INTEGER,
    },
    to: {
      type: Sequelize.INTEGER,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      default: true
    },
  });


  ProfessionalExperienceData.associate = (models) => {
   // ProfessionalExperienceData.hasMany(models.ProfessionalData, { as: 'professionalData', foreignKey: 'professional_dataId' })
  }
  return ProfessionalExperienceData;
};