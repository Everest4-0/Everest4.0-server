
const { v4: uuid } = require('uuid');

module.exports = ({ sequelize, Sequelize, defaultKeys }) => {
    const CoachingDuration = sequelize.define('coaching_durations', {

        ...defaultKeys,
        months: Sequelize.INTEGER,
        description: {
            type: Sequelize.STRING
        }
    },
        {
            indexes: [{
                fields: ['id']
            }]
        });

    CoachingDuration.associate = (models) => {
        CoachingDuration.hasMany(models.CoachingSubscription, { as: 'subscriptions', foreignKey: 'durationId' });
    }

    CoachingDuration.beforeCreate(coachingDuration => coachingDuration.id = uuid());

    return CoachingDuration;
}