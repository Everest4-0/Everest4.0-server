const { v4: uuid } = require('uuid');

module.exports = ({ sequelize, Sequelize }) => {

    const Answer = sequelize.define("answers", {
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
        // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    }, {
        indexes: [
            {
                fields: ['id', 'quizId']
            }
        ]
    });
  
        Answer.associate = (models) => {
            Answer.belongsTo(models.Quiz, { as: 'quiz', foreignKey: 'quizId' });
            Answer.belongsToMany(models.User,{as:'users',through: "user_answers"})
    }

    Answer.beforeCreate(answer => answer.id = uuid())
  
    return Answer;
};