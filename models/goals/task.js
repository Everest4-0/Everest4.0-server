
const { v4: uuid } = require('uuid')

module.exports = ({ sequelize, Sequelize, defaultKeys, }) => {

    const Task = sequelize.define("tasks", {
        ...defaultKeys,
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
    });
    Task.associate = (models) => {
        Task.belongsTo(models.Goal, { as: 'goal', foreignKey: 'goalId' })
        Task.belongsTo(models.User, { as: 'user', foreignKey: 'userId' })
        Task.hasMany(models.Budget, { as: 'budgets', foreignKey: 'taskId' })
    }

    Task.beforeCreate(task => task.id = uuid())
    return Task;
};