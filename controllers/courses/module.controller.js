var {
    Module,
    Op,
    Module,
    Evaluation,
    User,
    Module,
    updateOrCreate,
    Course,
    Activity
} = require('../../models/models');
const fs = require("fs");
const { paginate } = require('../global/paginator/paginator.controller');

exports.create = async (req, res) => {

    req.body.courseId = req.body.course.id;
    req.body.userId = req.body.user.id;
    let module = await Module.create(req.body).catch((e, module) => {
        res.status(400).json(e || module)
    });
    res.json(module)
}

exports.update = async (req, res) => {

    await Module.update(req.body, {
        where: {
            id: req.body.id
        }
    })
    req.body.activities.forEach(activity => updateOrCreate(Activity, {
        id: activity.id || null
    }, activity))
    let module = await Module.findByPk(req.body.id);

    res.json(module)
}

exports.delete = async (req, res) => {
    let module = Module.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json(module);
}

exports.one = async (req, res) => {

    let module = await Module.findByPk(req.params.id, {
        include: [{
                model: Course,
                as: 'course'
            },
            {
                model: Activity,
                as: 'activities'
            }
        ]
    });
    res.json(module)
}


exports.allBy = async (req, res) => {

    let filter = req.query

    if (req.query['$filter']) {
        filter = {
            [Op.or]: [{
                    email: {
                        [Op.like]: '%' + req.query['$filter'].toLowerCase() + '%'
                    }
                },
                {
                    telePhone: {
                        [Op.like]: '%' + req.query['$filter'].toLowerCase() + '%'
                    }
                }
            ]
        }
    }

    const where = filter,
        include = [{
            model: Course,
            as: 'course',
            include: [{
                model: Evaluation,
                as: 'evaluations'
            }]
        },
        {
            model: User,
            as: 'user'
        }
    ]

    const modules = await paginate({
        Model: Module,
        where,
        include,
        ...req.query
    })

    res.json(modules)


}