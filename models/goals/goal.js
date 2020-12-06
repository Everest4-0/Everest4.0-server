
const { v4: uuid } = require('uuid')

module.exports = ({ sequelize, Sequelize }) => {

    const Goal = sequelize.define("goals", {
        id: {
            primaryKey: true,
            type: Sequelize.UUID,
            default: Sequelize.UUIDV4
        },
        code: {
            type: Sequelize.STRING,
        },
        group: {
            type: Sequelize.STRING,
        },
        objectives: {
            type: Sequelize.STRING,
        },
        kpi: {
            type: Sequelize.STRING,
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
                fields: ['id', 'userId']
            }
        ]
    });
    Goal.associate = (models) => {
        Goal.belongsTo(models.User, { as: 'user', foreignKey: 'userId' })
        Goal.hasMany(models.PartialGoal, { as: 'partials', foreignKey: 'goalId' })
        Goal.hasMany(models.Task, { as: 'tasks', foreignKey: 'goalId' })
    }

    Goal.beforeCreate(goal => goal.id = uuid())
    return Goal;
};