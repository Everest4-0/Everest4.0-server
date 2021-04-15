
const { v4: uuid } = require('uuid')

module.exports = ({ sequelize, Sequelize }) => {

    const ToDo = sequelize.define("todos", {
        id: {
            primaryKey: true,
            type: Sequelize.UUID,
            default: Sequelize.UUIDV4
        },
        subject: {
            type: Sequelize.STRING,
        },
        done: {
            type: Sequelize.BOOLEAN,
            default: false
        },
        startDate: {
            type: Sequelize.DATE,
        },
        endDate: {
            type: Sequelize.DATE,
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
    ToDo.associate = (models) => {
        ToDo.belongsTo(models.User, { as: 'user', foreignKey: 'userId' })
    }

    ToDo.beforeCreate(todo => todo.id = uuid())
    ToDo.beforeCreate(todo => todo.state = false)
    return ToDo;
};