const { v4: uuid } = require('uuid');

module.exports = ({ sequelize, Sequelize }) => {

    const ActivityTask = sequelize.define("activity_tasks", {
        id: {
            primaryKey: true,
            type: Sequelize.UUID,
            default: Sequelize.UUIDV4
        },
        text: {
            type: Sequelize.STRING,
        },
        points: Sequelize.INTEGER,

        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    }, {
        indexes: [
            {
                fields: ['id', 'userId', 'activityId']
            }
        ]
    });

    ActivityTask.associate = (models) => {
        ActivityTask.belongsTo(models.User, { as: 'user', foreignKey: 'userId' })
        ActivityTask.belongsTo(models.Activity, { as: 'activity', foreignKey: 'activityId' })
        ActivityTask.hasMany(models.TaskAnswer, { as: 'answers', foreignKey: 'taskId' })
    }

    ActivityTask.beforeCreate(quiz => quiz.id = uuid())

    return ActivityTask;
};