module.exports = ({ sequelize, Sequelize }) => {

    const Goal = sequelize.define("goals", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.STRING
        },
        code: {
            type: Sequelize.STRING,
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
                fields: ['id', 'userId']
            }
        ]
    });
    Goal.associate = (models) => {
        Goal.belongsTo(models.User, { as: 'user', foreignKey: 'userId' })
    }

    Goal.beforeCreate(goal => goal.id = uuid())
    return Goal;
};