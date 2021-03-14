const {v4:uuid} = require('uuid');


module.exports = ({sequelize, Sequelize}) => {
    const Note = sequelize.define('notes', {
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
    }, {
        indexes:[{
            fields:['id', 'userId']
        }]
    });

    Note.associate = (models) =>{

       
        Note.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId'
        })
    }

    Note.beforeCreate(coachingSubscribe => coachingSubscribe.id = uuid());
    Note.beforeUpdate(coachingSubscribe => coachingSubscribe.updatedAt = new Date());
    
    return Note;
}