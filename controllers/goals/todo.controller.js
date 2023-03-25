var {
    ToDo,
    User
} = require('../../models/models');
const { paginate } = require('../global/paginator/paginator.controller');

exports.create = async (req, res) => {
    //req.body.group = req.body.group.code
    req.body.userId = req.user.id
    let todo = await ToDo.create(req.body).catch((e, ToDo) => {
        res.status(400).json(e || ToDo)
    });
    res.json(todo)
}

exports.update = async (req, res) => {

    await ToDo.update(req.body, {
        where: {
            id: req.body.id
        }
    }).catch(e => {
        let i = e
    });;
    let todo = await ToDo.findByPk(req.body.id, {
        include: [{
            model: User,
            as: 'user'
        }]
    }).catch(e => {
        let i = e
    });
    res.json(todo);
}

exports.delete = async (req, res) => {
    let ToDo = ToDo.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json({
        status: 200,
        message: "sucess",
        data: ToDo
    });
}

exports.one = async (req, res) => {

    let ToDo = await ToDo.findByPk(req.params.id, {
        include: [{
            model: User,
            as: 'user'
        }]
    });
    res.json(ToDo)
}

exports.allBy = async (req, res) => {

    let filter = req.query

    const where = filter,
        include = [
            {
                model: User,
                as: 'user'
            }
        ]

    const todoList = await paginate({
        Model: ToDo,
        where,
        include,
        ...req.query
    })

    res.json(todoList)
}