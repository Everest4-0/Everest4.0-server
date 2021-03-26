const { v4: uuid } = require('uuid');
const { Chat } = require('../models');


module.exports = ({ sequelize, Sequelize }) => {
    const CoachingSubscription = sequelize.define('coaching_subscriptions', {
        id: {
            primaryKey: true,
            type: Sequelize.UUID,
            default: Sequelize.UUIDV4
        },
        description: {
            type: Sequelize.STRING
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            default: true
        },
        //Timestamp
        activatedAt: Sequelize.DATE,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    }, {
        indexes: [{
            fields: ['id', 'userId']
        }]
    });

    CoachingSubscription.associate = (models) => {

        CoachingSubscription.belongsTo(models.CoachingGoal, { as: 'goal', foreignKey: 'goalId' });
        CoachingSubscription.belongsTo(models.CoachingDuration, { as: 'duration', foreignKey: 'durationId' });
        CoachingSubscription.belongsTo(models.User, { as: 'user', foreignKey: 'userId' })
        CoachingSubscription.belongsTo(models.User, { as: 'coach', foreignKey: 'coachId' })
        CoachingSubscription.belongsTo(models.Chat, { as: 'chat' })
        CoachingSubscription.hasMany(models.Note, { as: 'notes', foreignKey: 'subscriptionId' })

    }

    CoachingSubscription.beforeCreate(coachingSubscribe => coachingSubscribe.id = uuid());
    /*CoachingSubscription.afterUpdate(async subscription => {
        if (subscription.coachId == null) return;
        let chat = await Chat.create({
            from_user_id: subscription.coachId,
            to_user_id: subscription.userId
        })
        coachingSubscribe.chatId = chat.id
        coachingSubscribe.save()
    });*/

    return CoachingSubscription;
}