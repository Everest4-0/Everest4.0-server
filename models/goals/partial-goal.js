
const { v4: uuid } = require('uuid')

module.exports = ({ sequelize, Sequelize }) => {

    const PartialGoal = sequelize.define("partial_goals", {
        id: {
            primaryKey: true,
            type: Sequelize.UUID,
            default: Sequelize.UUIDV4
        },
        value: {
            type: Sequelize.DECIMAL(10,2),
        },
        descriptions: {
            type: Sequelize.STRING,
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            default: true
        },
        // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    }, {
        indexes: [
            {
                fields: ['id', 'goalId']
            }
        ]
    });
    PartialGoal.associate = (models) => {
        PartialGoal.belongsTo(models.Goal, { as: 'goal', foreignKey: 'goalId' })
    }

    PartialGoal.beforeCreate(goal => goal.id = uuid())
    return PartialGoal;
};