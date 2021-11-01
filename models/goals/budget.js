
const { v4: uuid } = require('uuid')

module.exports = ({ sequelize, Sequelize, defaultKeys, }) => {

    const Budget = sequelize.define("budgets", {
        ...defaultKeys,
        code: {
            type: Sequelize.STRING,
        },
        value: {
            type: Sequelize.DECIMAL(32, 2),
        },
        direction: {
            type: Sequelize.BOOLEAN,
        },
        descriptions: {
            type: Sequelize.STRING,
        }
    });
    Budget.associate = (models) => {
        Budget.belongsTo(models.Task, { as: 'task', foreignKey: 'taskId' })
        Budget.belongsTo(models.BudgetCategory, { as: 'category', foreignKey: 'categoryId' })
    }

    Budget.beforeCreate(budget => budget.id = uuid())
    
    return Budget;
};