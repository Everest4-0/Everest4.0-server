const {v4:uuid} = require('uuid');


module.exports = ({sequelize, Sequelize, defaultKeys}) => {
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
        ...defaultKeys
    }, {
        indexes:[{
            fields:['id', 'userId']
        }]
    });

    Note.associate = (models) =>{

       
        Note.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId'
        });

        Note.belongsTo(models.CoachingSubscription, {
            as: 'subscription',
            foreignKey: 'subscriptionId'
        })
    }

    Note.beforeCreate(note => note.id = uuid());
    Note.beforeUpdate(note => note.updatedAt = new Date());
    
    return Note;
}