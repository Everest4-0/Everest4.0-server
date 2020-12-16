
const { v4: uuid } = require('uuid')

module.exports = ({ sequelize, Sequelize }) => {

    const Task = sequelize.define("tasks", {
        id: {
            primaryKey: true,
            type: Sequelize.UUID,
            default: Sequelize.UUIDV4
        },
        revenue: {
            type: Sequelize.DECIMAL(10, 2),
        },
        expenses: {
            type: Sequelize.DECIMAL(10, 2),
        },
        descriptions: {
            type: Sequelize.STRING,
        },
        observations: {
            type: Sequelize.STRING,
        },
        state: {
            type: Sequelize.INTEGER,
        },
        duration: {
            type: Sequelize.INTEGER,
            default: 0
        },
        dueDate: {
           type: Sequelize.DATE,
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
    Task.associate = (models) => {
        Task.belongsTo(models.Goal, { as: 'goal', foreignKey: 'goalId' })
        Task.hasMany(models.Budget, { as: 'budgets', foreignKey: 'taskId' })
    }

    Task.beforeCreate(task => task.id = uuid())
    return Task;
};