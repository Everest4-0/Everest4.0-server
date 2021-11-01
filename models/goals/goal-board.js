module.exports = ({ sequelize, Sequelize, defaultKeys, }) => {

    const GoalBoard = sequelize.define("goals_boards", {
        ...defaultKeys,
        code: {
            type: Sequelize.STRING,
        },
        descriptions: {
            type: Sequelize.STRING,
        }
    });

    GoalBoard.consts = [
        { code: 'S', descriptions: 'Forças' },
        { code: 'W', descriptions: 'Fraquezas' },
        { code: 'O', descriptions: 'Oportunidades' },
        { code: 'T', descriptions: 'Ameaças' }
    ]
    return GoalBoard;
};