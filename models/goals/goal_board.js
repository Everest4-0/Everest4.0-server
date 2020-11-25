module.exports = ({ sequelize, Sequelize }) => {

    const GoalBoard = sequelize.define("goals_boards", {
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
    });

    GoalBoard.consts = [
        { code: 'S', descriptions: 'Forças' },
        { code: 'W', descriptions: 'Fraquezas' },
        { code: 'O', descriptions: 'Oportunidades' },
        { code: 'T', descriptions: 'Ameaças' }
    ]
    return GoalBoard;
};