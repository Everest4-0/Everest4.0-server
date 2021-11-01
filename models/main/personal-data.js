
const Consts = require("../../application/constants/consts")
module.exports = ({ sequelize, Sequelize, defaultKeys }) => {

  const PersonalData = sequelize.define("personal_data", {
    ...defaultKeys,
    sex: {
      type: Sequelize.STRING
    },
    fullName: {
      type: Sequelize.STRING,
      get() {
        return this.getDataValue('firstName') + (this.getDataValue('othersName') ? ' ' + this.getDataValue('othersName') : '' )+ ' ' + this.getDataValue('lastName')
      }
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
    birthDate: {
      type: Sequelize.DATE
    },
    activitySector: {
      type: Sequelize.INTEGER,
      get(){
        return Consts.ActivitySectors.filter(x=>x.id===this.getDataValue('activitySector'))[0]
      }
    },
    descriptions: {
      type: Sequelize.STRING,
    },
    salary: {
      type: Sequelize.DECIMAL(32.2),
    }
  });


  PersonalData.associate = (models) => {
    //PersonalData.belongsTo(models.ProfessionalExperienceData, { as: 'professionalExperience', foreignKey: 'ProfessionalExperienceDataId' })
    PersonalData.belongsTo(models.AcademicLevel, { as: 'academicLevel', foreignKey: 'acad_levelId' });
    PersonalData.belongsTo(models.ProfessionalExperience, { as: 'professionalExperience', foreignKey: 'pro_expId', });
    PersonalData.belongsTo(models.WorkSituation, { as: 'workSituation', foreignKey: 'work_sitId', });
  }

  PersonalData.beforeCreate(data => data.id = data.userId)
  return PersonalData;
};