
const { v4: uuid } = require('uuid')

module.exports = ({ sequelize, Sequelize }) => {

    const BudgetCategory = sequelize.define("budget_categories", {
        id: {
            primaryKey: true,
            type: Sequelize.UUID,
            default: Sequelize.UUIDV4
        },
        code: {
            type: Sequelize.STRING,
        },
        name: {
            type: Sequelize.STRING,
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
                fields: ['id']
            }
        ]
    });
    BudgetCategory.associate = (models) => {
        BudgetCategory.hasMany(models.Budget, { as: 'budgets', foreignKey: 'categoryId' })
    }

    BudgetCategory.beforeCreate(category => category.id = uuid())
    return BudgetCategory;
};