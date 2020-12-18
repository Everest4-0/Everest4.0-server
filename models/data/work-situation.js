const { v4: uuid } = require('uuid')
module.exports = ({sequelize, Sequelize}) => {

    const WorkSituation = sequelize.define("work_situation", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        default: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        unique: true 
      },
      descriptions: {
        type: Sequelize.STRING,
      },
      isActive:{
          type:Sequelize.BOOLEAN,
          default:true
      },
      // Timestamps
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
    WorkSituation.beforeCreate(r => r.id = uuid())
    return WorkSituation;
  };