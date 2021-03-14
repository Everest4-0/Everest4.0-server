const { v4: uuid } = require('uuid');


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
        CoachingSubscription.belongsTo(models.User, {as: 'user',foreignKey: 'userId'})
        CoachingSubscription.belongsTo(models.User, {as: 'coach',foreignKey: 'coachId'})
        CoachingSubscription.belongsTo(models.Chat, {as: 'chat'})

    }

    CoachingSubscription.beforeCreate(coachingSubscribe => coachingSubscribe.id = uuid());

    return CoachingSubscription;
}