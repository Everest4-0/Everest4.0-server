
const { uuid: uuidV4 } = require('uuid');
module.exports = ({sequelize, Sequelize}) => {

    const ACL = sequelize.define("acl", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING,
        unique: true 
      },
      recourses: {
        type: Sequelize.STRING,
      },
      methods: {
        type: Sequelize.STRING,
        get() {
            return this.getDataValue('methods').split(';')
        },
        set(val) {
           this.setDataValue('methods',val.join(';'));
        },
      },
      allow:{
          type:Sequelize.BOOLEAN,
          defoult:true
      },
      generalAcess:{
          type:Sequelize.BOOLEAN,
          defoult:false
      },
      isActive:{
          type:Sequelize.BOOLEAN,
          defoult:true
      },
      // Timestamps
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
    return ACL;
  };