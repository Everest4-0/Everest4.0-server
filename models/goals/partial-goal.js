
const { v4: uuid } = require('uuid')

module.exports = ({ sequelize, Sequelize,defaultKeys, }) => {

    const PartialGoal = sequelize.define("partial_goals", {
    ...defaultKeys,
        value: {
            type: Sequelize.DECIMAL(10,2),
        },
        descriptions: {
            type: Sequelize.STRING,
        }
    });
    PartialGoal.associate = (models) => {
        PartialGoal.belongsTo(models.Goal, { as: 'goal', foreignKey: 'goalId' })
    }

    PartialGoal.beforeCreate(goal => goal.id = uuid())
    return PartialGoal;
};