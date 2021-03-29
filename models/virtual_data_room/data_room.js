const {v4:uuid} = require('uuid');


module.exports = ({sequelize, Sequelize}) => {
    const DataRoom = sequelize.define('data_rooms', {
        id:{
            primaryKey: true,
            type: Sequelize.UUID,
            default: Sequelize.UUIDV4
        },
        descriptions:{
            type: Sequelize.TEXT
        },
        title:{
            type: Sequelize.STRING
        },
        isActive:{
            type:Sequelize.BOOLEAN,
            default: true
        },
        //Timestamp
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    },);

    DataRoom.associate = (models) =>{
       
        DataRoom.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId'
        });

        DataRoom.belongsToMany(models.File, {
            as: 'files',
            through: "data_room_files",
            foreignKey: 'dataRoomId'
        });

        DataRoom.belongsToMany(models.User, {
            as: 'shareds',
            through: "shared_data_rooms",
            foreignKey: 'dataRoomId'
        })
    }

    DataRoom.beforeCreate(data => data.id = uuid());
    DataRoom.beforeUpdate(data => data.updatedAt = new Date());
    
    return DataRoom;
}