
const { v4: uuid } = require('uuid');

module.exports = ({ sequelize, Sequelize }) => {
    const CoachingDuration = sequelize.define('coaching_durations', {
        id: {
            primaryKey: true,
            type: Sequelize.UUID,
            default: Sequelize.UUIDV4
        },
        months: Sequelize.INTEGER,
        description: {
            type: Sequelize.STRING
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            default: true
        },
        // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    },
        {
            indexes: [{
                fields: ['id']
            }]
        });

    CoachingDuration.associate = (models) => {
        CoachingDuration.belongsTo(models.CoachingSubscription, { as: 'subscriptions', foreignKey: 'durationId' });
    }

    CoachingDuration.beforeCreate(coachingDuration => coachingDuration.id = uuid());

    return CoachingDuration;
}