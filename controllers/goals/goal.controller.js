var { Goal, Role, Op, PartialGoal, User, Task, Budget, BudgetCategory } = require('../../models/models');

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
    let goal = await Goal.findByPk(req.body.id, {
        include: [
            {
                model: Task,
                as: 'tasks'
            }
        ]
    }).catch(e => {
        let i = e
    });
    res.json(goal);
}

exports.delete = async (req, res) => {

    if (req.params.force) {
        await Goal.destroy({ where: { id: req.params.id } });
    } else {
        await Goal.toTrash({ id: req.params.id });
    }
    res.json({
        status: 200,
        message: "success"
    });
}

exports.one = async (req, res) => {

    let Goal = await Goal.findByPk(req.params.id, {
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
    res.json(Goal)
}

exports.allBy = async (req, res) => {

    let { query, where } = req

    let goals = await Goal.findAll({
        where: query,
        include: [
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
                as: 'tasks',required: false,
                where,
                include: [
                    {
                        model: Budget,
                        as: 'budgets',required: false,
                        include: [
                            {
                                model: BudgetCategory,
                                as: 'category',required: false,
                            }]
                    }
                ]
            }
        ]
    }).catch((e, r) => {
        let u = e
    });

    res.json(goals)
}

