
const { uuid: uuidV4 } = require('uuid');
module.exports = ({ sequelize, Sequelize }) => {

  const PersonalData = sequelize.define("personal_data", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID
    },
    sex: {
      type: Sequelize.STRING
    },
    fullName: {
      type: Sequelize.STRING,
      get() {
        return this.getDataValue('firstName') + this.getDataValue('othersName') ? ' ' + this.getDataValue('othersName') : '' + ' ' + this.getDataValue('lastName')
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
        let i = this.getDataValue('act_secId');
        return [{ id: 2, name: 'Público' }, { id: 1, name: 'Privado' }, { id: 0, name: 'Outro' }][this.getDataValue('act_secId')]
      }
    },
    descriptions: {
      type: Sequelize.STRING,
    },
    salary: {
      type: Sequelize.DECIMAL(32.2),
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
        fields: ['id', 'work_sitId', 'pro_expId', 'acad_levelId','act_secId']
      }
    ]
  });


  PersonalData.associate = (models) => {
    //PersonalData.belongsTo(models.ProfessionalExperienceData, { as: 'professionalExperience', foreignKey: 'ProfessionalExperienceDataId' })
    PersonalData.belongsTo(models.AcademicLevel, { as: 'academicLevel', foreignKey: 'acad_levelId', });
    PersonalData.belongsTo(models.ProfessionalExperience, { as: 'professionalExperience', foreignKey: 'pro_expId', });
    PersonalData.belongsTo(models.WorkSituation, { as: 'workSituation', foreignKey: 'work_sitId', });

   // PersonalData.hasOne(models.User, { as: 'user', foreignKey: 'id' });
  }


  PersonalData.beforeCreate(data => data.id = data.userId)
  return PersonalData;
};