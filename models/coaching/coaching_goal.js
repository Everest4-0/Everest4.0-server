const { UUID, UUIDV4 } = require('sequelize/types');
const {v4:uuid} = require ('uuid');

module.exports = ({sequelize, Sequelize}) =>{
    const CoachingGoal = sequelize.define('coaching_goals', {
        id:{
            primaryKey: true,
            type: UUID,
            default: UUIDV4
        },
        goal:{
            type:Sequelize.STRING
        },
        isActive:{
            type:Sequelize.BOLEAN,
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