
const { v4: uuid } = require('uuid')
module.exports = ({ sequelize, Sequelize }) => {

  const Evaluation = sequelize.define("evaluation", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      default: Sequelize.UUIDV4
    },
    code: {
      type: Sequelize.STRING,
      unique: true
    },
    name: {
      type: Sequelize.STRING,
      unique: true
    },
    descriptions: {
      type: Sequelize.STRING,
    },
    group: {
      type: Sequelize.STRING,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      default: true
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },{
    classMethods: {
      associate(models) {
        // associations can be defined here
     //   Evaluation.hasMany(models.UserEvaluation, { foreignKey: 'evaluationId', });
      },
    },
  });
  Evaluation.associate = (models) => {
    Evaluation.hasMany(models.UserEvaluation, { foreignKey: 'evaluationId' })
  }
  Evaluation.consts = [
    { name: 'Carreira', group: 'Pofissional' },
    { name: 'Finanças', group: 'Pofissional' },
    { name: 'Contribuição', group: 'Pofissional' },

    { name: 'Intelectual', group: 'Pessoal' },
    { name: 'Emocional', group: 'Pessoal' },
    { name: 'Feliciadade', group: 'Pessoal' },

    { name: 'Família', group: 'Relacionamentos' },
    { name: 'Amor', group: 'Relacionamentos' },
    { name: 'Social', group: 'Relacionamentos' },

    { name: 'Espiritualidade', group: 'Qualidade de vida' },
    { name: 'Saúde', group: 'Qualidade de vida' },
    { name: 'lazer', group: 'Qualidade de vida' }
  ]
  Evaluation.beforeCreate(evaluation =>{ 
    evaluation.id = uuid();
    let yU=0;
  })
  return Evaluation;
};