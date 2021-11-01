
const { v4: uuid } = require('uuid')

module.exports = ({ sequelize, Sequelize, defaultKeys,}) => {

    const Goal = sequelize.define("goals", {
            ...defaultKeys,
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
    });
    Goal.associate = (models) => {
        Goal.belongsTo(models.User, { as: 'user', foreignKey: 'userId' })
        Goal.hasMany(models.PartialGoal, { as: 'partials', foreignKey: 'goalId' })
        Goal.hasMany(models.Task, { as: 'tasks', foreignKey: 'goalId' })
    }

    Goal.beforeCreate(goal => goal.id = uuid())
    return Goal;
};