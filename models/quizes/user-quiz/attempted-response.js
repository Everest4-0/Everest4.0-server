const { v4: uuid } = require('uuid');

module.exports = ({ sequelize, Sequelize }) => {

    const AttemptedResponse = sequelize.define("attemptedResponses", {
        id: {
            primaryKey: true,
            type: Sequelize.UUID,
            default: Sequelize.UUIDV4
        },
        // Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    }, {
        indexes: [
            {
                fields: ['id', 'userId', 'answerId']
            }
        ]
    });
  
    AttemptedResponse.associate = (models) => {
        AttemptedResponse.belongsTo(models.User, { as: 'user', foreignKey: 'userId' })
        AttemptedResponse.belongsTo(models.Answer, { as: 'answer', foreignKey: 'answerId' })
    }

    AttemptedResponse.beforeCreate(attemptedResponse => attemptedResponse.id = uuid())
  
    return AttemptedResponse;
};