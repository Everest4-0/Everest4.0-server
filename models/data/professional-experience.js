const { v4: uuid } = require('uuid')
module.exports = ({ sequelize, Sequelize }) => {

  const ProfessionalExperience = sequelize.define("professional_experience", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      default: Sequelize.UUIDV4
    },

    name: {
      type: Sequelize.STRING,
      get() {
          let str = '';
          if (this.from !== null && this.to !== null) {
            str += 'Entre ' + this.from + ' a '
            str += this.to + ' anos'
          } else if (this.from !== null && this.to === null) {
            str += 'Mais de ' + this.from + ' anos'
          } else {
            str += 'Menos de ' + this.to + ' anos'
          }

          return str;

        
      }
    },
    from: {
      type: Sequelize.INTEGER,
    },
    to: {
      type: Sequelize.INTEGER,
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
  });


  ProfessionalExperience.associate = (models) => {
  //  ProfessionalExperience.hasMany(models.AcademicLevel, { as: 'AcademicLevel', foreignKey: 'academic_levelId', });
  }

  ProfessionalExperience.beforeCreate(r => r.id = uuid())
  return ProfessionalExperience;
};