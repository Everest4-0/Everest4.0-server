var {
    Activity
    , Op
    , Module
    , Evaluation,
    User,
    Activity,
    updateOrCreate,
    Course
} = require('../../models/models');
const fs = require("fs");

exports.create = async (req, res) => {

    req.body.moduleId = req.body.module.id;
    let activity = await Activity.create(req.body).catch((e, activity) => {
        res.status(400).json(e || activity)
    });
    res.json(activity)
}

exports.update = async (req, res) => {

    await Activity.update(req.body, {
        where: { id: req.body.id }
    })
    res.json(activity)
}

exports.delete = async (req, res) => {
    let activity = Activity.destroy(
        {
            where: {
                id: req.params.id
            }
        }
    )
    res.json(activity);
}

exports.one = async (req, res) => {

    let activity = await Activity.findByPk(req.params.id, {
        include: [
            {
                model: Module,
                as: 'module'
            }
        ]
    });
    res.json(activity)
}


exports.allBy = async (req, res) => {

    let filter = req.query

    if (req.query['$filter']) {
        filter = {
            [Op.or]: [
                {
                    email: { [Op.like]: '%' + req.query['$filter'].toLowerCase() + '%' }
                },
                {
                    telePhone: { [Op.like]: '%' + req.query['$filter'].toLowerCase() + '%' }
                }
            ]
        }
    }

    let activities = await Activity.findAll({
        where: filter,
        include: [
            {
                model: Module,
                as: 'module'                
            }
        ]
    }).catch((e, r) => {
        let u = e
    });

    res.json(activities)
}

