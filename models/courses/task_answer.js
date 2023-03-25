const { v4: uuid } = require('uuid');

module.exports = ({ sequelize, Sequelize }) => {

    const TaskAnswer = sequelize.define("task_answers", {
        id: {
            primaryKey: true,
            type: Sequelize.UUID,
            default: Sequelize.UUIDV4
        },
        text: {
            type: Sequelize.STRING,
        },
        correct: {
            type: Sequelize.BOOLEAN,
        },
        enrollmentId: {
            type: Sequelize.STRING,
        },
        // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    }, {
        indexes: [{
            fields: ['id', 'taskId']
        }]
    });

    TaskAnswer.associate = (models) => {
        TaskAnswer.belongsTo(models.ActivityTask, { as: 'task', foreignKey: 'taskId' });
        TaskAnswer.belongsToMany(models.Enrollment, { as: 'enrollments', through: "users_enrollments", foreignKey: 'enrollmentId' })
        TaskAnswer.belongsToMany(models.User, { as: 'users', through: "user_task_answers" })
    }

    TaskAnswer.beforeCreate(answer => answer.id = uuid())

    return TaskAnswer;
};