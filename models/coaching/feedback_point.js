const {v4:uuid} = require('uuid');


module.exports = ({sequelize, Sequelize}) => {
    const FeedbackPoint = sequelize.define('feedback_points', {
        id:{
            primaryKey: true,
            type: Sequelize.UUID,
            default: Sequelize.UUIDV4
        },
        descriptions:{
            type: Sequelize.TEXT
        },
        point:{
            type: Sequelize.INTEGER
        },
        isActive:{
            type:Sequelize.BOOLEAN,
            default: true
        },
        //Timestamp
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    });

    FeedbackPoint.associate = (models) =>{
        FeedbackPoint.belongsTo(models.Feedback, {
            as: 'feedback',
            foreignKey: 'feedbackId'
        })
        FeedbackPoint.belongsTo(models.FeedbackItem, {
            as: 'item',
            foreignKey: 'itemId'
        })
    }
    FeedbackPoint.beforeCreate(point => point.id = uuid());
    FeedbackPoint.beforeUpdate(point => point.updatedAt = new Date());
    
    return FeedbackPoint;
}