const {v4:uuid} = require ('uuid');

module.exports = ({sequelize, Sequelize}) =>{
    const CoachingGoal = sequelize.define('coaching_goals', {
        id:{
            primaryKey: true,
            type: Sequelize.UUID,
            default: Sequelize.UUIDV4
        },
        description:{
            type:Sequelize.STRING
        },
        isActive:{
            type:Sequelize.BOOLEAN,
            default: true
        },
        // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    },
    {
        indexes:[{
            fields: ['id']
        }]
    });

    CoachingGoal.associate = (models) => {
        CoachingGoal.belongsTo(models.CoachingSubscribe, {as: 'goal', foreignKey:'goalId'})
    }

    CoachingGoal.beforeCreate(coachingGoal => coachingGoal.id = uuid());

    return CoachingGoal;
}