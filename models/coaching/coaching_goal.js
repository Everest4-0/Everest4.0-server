const {v4:uuid} = require ('uuid');

module.exports = ({sequelize, Sequelize, defaultKeys}) =>{
    const CoachingGoal = sequelize.define('coaching_goals', {
        ...defaultKeys,
        title:{
            type:Sequelize.STRING
        },
        description:{
            type:Sequelize.TEXT
        }
    },
    {
        indexes:[{
            fields: ['id']
        }]
    });

    CoachingGoal.associate = (models) => {
        CoachingGoal.hasMany(models.CoachingSubscription, {as: 'subscriptions', foreignKey: 'goalId'})
    }

    CoachingGoal.beforeCreate(coachingGoal => coachingGoal.id = uuid());

    return CoachingGoal;
}