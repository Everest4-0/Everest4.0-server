var {
    Goal,
    Role,
    Op,
    PartialGoal,
    User,
    Task,
    Budget,
    BudgetCategory
} = require('../../models/models');
const {
    paginate
} = require('../global/paginator/paginator.controller');

exports.create = async (req, res) => {
    //req.body.group = req.body.group.code
    req.body.userId = req.body.user.id
    let goal = await Goal.create(req.body).catch((e, Goal) => {
        res.status(400).json(e || Goal)
    });
    let part;
    req.body.partials.forEach(async partial => {
        partial.goalId = goal.id
        part = await PartialGoal.create(partial).catch((e, g) => {
            let u = e;
        });
    });
    res.json(goal)
}

exports.update = async (req, res) => {

    req.body.isActive = true;
    await Goal.update(req.body, {
        where: {
            id: req.body.id
        }
    });
    let Goal = await Goal.findByPk(req.body.id, {
        include: [{
            model: Role,
            as: 'role'
        }]
    }).catch(e => {
        let i = e
    });
    res.json(Goal);
}

exports.delete = async (req, res) => {
    let Goal = Goal.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json({
        status: 200,
        message: "sucess",
        data: Goal
    });
}

exports.one = async (req, res) => {

    let Goal = await Goal.findByPk(req.params.id, {
        include: [{
                model: User,
                as: 'user'
            },
            {
                model: PartialGoal,
                as: 'partials'
            }
        ]
    });
    res.json(Goal)
}

exports.allBy = async (req, res) => {

    let filter = req.query

    const where = filter,
        include = [
            {
                model: User,
                as: 'user'
            },
            {
                model: PartialGoal,
                as: 'partials'
            },
            {
                model: Task,
                as: 'tasks',
                include: [{
                    model: Budget,
                    as: 'budgets',
                    include: [{
                        model: BudgetCategory,
                        as: 'category'
                    }]
                }]
            }
        ]

    const goals = await paginate({
        Model: Goal,
        where,
        include,
        ...req.query
    })

    res.json(goals)
}