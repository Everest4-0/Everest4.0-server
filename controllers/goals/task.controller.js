var {
    Task,
    Role,
    Op,
    PartialGoal,
    User,
    Goal
} = require('../../models/models');
const { paginate } = require('../global/paginator/paginator.controller');

exports.create = async (req, res) => {
    req.body.goalId = req.body.goal.id
    let task = await Task.create(req.body).catch((e, Task) => {
        res.status(400).json(e || Task)
    });
    res.json(task)
}

exports.update = async (req, res) => {

    await Task.update(req.body, {
        where: {
            id: req.body.id
        }
    })
    let task = await Task.findByPk(req.body.id, {
        include: [{
            model: Goal,
            as: 'goal'
        }]
    }).catch(e => {
        let i = e
    });
    res.json(task);
}

exports.delete = async (req, res) => {
    let Task = Task.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json({
        status: 200,
        message: "sucess",
        data: Task
    });
}

exports.one = async (req, res) => {

    let Task = await Task.findByPk(req.params.id, {
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
    res.json(Task)
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
            }
        ]

    const tasks = await paginate({
        Model: Task,
        where,
        include,
        ...req.query
    })

    res.json(tasks)
}