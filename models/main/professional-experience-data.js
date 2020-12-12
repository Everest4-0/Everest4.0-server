
const { uuid: uuidV4 } = require('uuid');
module.exports = ({ sequelize, Sequelize }) => {

  const ProfessionalExperienceData = sequelize.define("professional_experience_data", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID
    },
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
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });


  ProfessionalExperienceData.associate = (models) => {
   // ProfessionalExperienceData.hasMany(models.ProfessionalData, { as: 'professionalData', foreignKey: 'professional_dataId' })
  }
  return ProfessionalExperienceData;
};