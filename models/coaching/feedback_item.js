const {v4:uuid} = require('uuid');


module.exports = ({sequelize, Sequelize}) => {
    const FeedbackItem = sequelize.define('feedback_items', {
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
    });

    FeedbackItem.beforeCreate(item => item.id = uuid());
    FeedbackItem.beforeUpdate(item => item.updatedAt = new Date());
    
    return FeedbackItem;
}