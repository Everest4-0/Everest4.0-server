const {v4:uuid} = require('uuid');


module.exports = ({sequelize, Sequelize}) => {
    const FeedbackComment = sequelize.define('feedback_comments', {
        id:{
            primaryKey: true,
            type: Sequelize.UUID,
            default: Sequelize.UUIDV4
        },
        descriptions:{
            type: Sequelize.TEXT
        },
        isActive:{
            type:Sequelize.BOOLEAN,
            default: true
        },
        //Timestamp
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    });

    FeedbackComment.associate = (models) =>{
        FeedbackComment.belongsTo(models.Feedback, {
            as: 'feedback',
            foreignKey: 'feedbackId'
        })
        FeedbackComment.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId'
        })
    }
    FeedbackComment.beforeCreate(point => point.id = uuid());
    FeedbackComment.beforeUpdate(point => point.updatedAt = new Date());
    
    return FeedbackComment;
}