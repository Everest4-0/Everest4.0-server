var { Budget, Role, Op, PartialGoal, User, Goal } = require('../../models/models');

exports.create = async (req, res) => {
    let budget = await Budget.create(req.body).catch((e, budget) => {
        res.status(400).json(e || budget)
    });
    res.json(budget)
}

exports.update = async (req, res) => {

    await Budget.update(req.body, {
        where: {
            id: req.body.id
        }
    })

    let budget = await Budget.findByPk(req.body.id, {
        include: [
            {
                model: Goal,
                as: 'goal'
            }
        ]
    }).catch(e => {
        let i = e
    });
    res.json(budget);
}

exports.delete = async (req, res) => {
    let Budget = Budget.destroy({ where: { id: req.params.id } })
    res.json({
        status: 200,
        message: "sucess",
        data: Budget
    });
}

exports.one = async (req, res) => {

    let Budget = await Budget.findByPk(req.params.id, {
        include: [
            {
                model: User,
                as: 'user'
            },
            {
                model: PartialGoal,
                as: 'partials'
            }
        ]
    });
    res.json(Budget)
}

exports.allBy = async (req, res) => {

    let filter = req.query

    let Goals = await Budget.findAll({
        where: filter,
        include: [

            {
                model: User,
                as: 'user'
            },
            {
                model: PartialGoal,
                as: 'partials'
            }
        ]
    }).catch((e, r) => {
        let u = e
    });

    res.json(Goals)
}

