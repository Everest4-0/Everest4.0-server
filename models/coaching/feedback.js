const {v4:uuid} = require('uuid');


module.exports = ({sequelize, Sequelize}) => {
    const Feedback = sequelize.define('feedbacks', {
        id:{
            primaryKey: true,
            type: Sequelize.UUID,
            default: Sequelize.UUIDV4
        },
        descriptions:{
            type: Sequelize.TEXT
        },
        orderNo:{
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

    Feedback.associate = (models) =>{
        Feedback.belongsTo(models.CoachingSubscription, {
            as: 'subscription',
            foreignKey: 'subscriptionId'
        })
        Feedback.hasMany(models.FeedbackPoint, {
            as: 'points',
            foreignKey: 'feedbackId'
        })
    }
    Feedback.beforeCreate(feedback => feedback.id = uuid());
    Feedback.beforeUpdate(feedback => feedback.updatedAt = new Date());
    
    return Feedback;
}