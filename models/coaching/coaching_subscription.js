const {v4:uuid} = require('uuid');


module.exports = ({sequelize, Sequelize}) => {
    const CoachingSubscription = sequelize.define('coaching_subscription', {
        id:{
            primaryKey: true,
            type: Sequelize.UUID,
            default: Sequelize.UUIDV4
        },
        description:{
            type: Sequelize.STRING
        },
        isActive:{
            type:Sequelize.BOOLEAN,
            default: true
        },
        //Timestamp
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    }, {
        indexes:[{
            fields:['id', 'userId', 'durationId', 'goalId']
        }]
    });

    CoachingSubscription.associate = (models) =>{

        CoachingSubscription.hasMany(models.CoachingDuration);
        CoachingSubscription.hasMany(models.CoachingGoal);

        CoachingSubscription.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId'
        })
    }

    CoachingSubscription.beforeCreate(coachingSubscribe => coachingSubscribe.id = uuid());
    
    return CoachingSubscription;
}