
const { v4: uuid } = require('uuid')

module.exports = ({ sequelize, Sequelize, defaultKeys, }) => {

    const BudgetCategory = sequelize.define("budget_categories", {
        ...defaultKeys,
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