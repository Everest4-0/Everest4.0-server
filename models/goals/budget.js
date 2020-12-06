
const { v4: uuid } = require('uuid')

module.exports = ({ sequelize, Sequelize }) => {

    const Budget = sequelize.define("budgets", {
        id: {
            primaryKey: true,
            type: Sequelize.UUID,
            default: Sequelize.UUIDV4
        },
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
                fields: ['id', 'taskId']
            }
        ]
    });
    Budget.associate = (models) => {
        Budget.belongsTo(models.Task, { as: 'task', foreignKey: 'taskId' })
    }

    Budget.beforeCreate(budget => budget.id = uuid())
    return Budget;
};