var {
    Enrollment
    , Op
    , Module
    , Evaluation,
    User,
    Enrollment,
    updateOrCreate,
    Course,
    Activity
} = require('../../models/models');
const fs = require("fs");

exports.create = async (req, res) => {

    req.body.courseId = req.body.course.id;
    req.body.course=null;
    req.body.userId = req.user.id;
    let enrollment = await Enrollment.create(req.body).catch((e, enrollment) => {
        res.status(400).json(e || enrollment)
    });
    res.json(enrollment)
}

exports.update = async (req, res) => {

    req.body.activityId = req.body.lastActivity.id

    await Enrollment.update(req.body, {
        where: { id: req.body.id }
    })
    let enrollment = await Enrollment.findByPk(req.body.id);

    res.json(enrollment)
}

exports.delete = async (req, res) => {
    let enrollment = Enrollment.destroy(
        {
            where: {
                id: req.params.id
            }
        }
    )
    res.json(enrollment);
}

exports.one = async (req, res) => {

    let enrollment = await Enrollment.findByPk(req.params.id, {
        include: [
            {
                model: Course,
                as: 'course'
            },
            {
                model: User,
                as: 'user'
            },
            {
                model: Activity,
                as: 'lastActivity'
            }
        ]
    });
    res.json(enrollment)
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


    let enrollments = await Enrollment.findAll({
        where: filter,
        include: [
            {
                model: Course,
                as: 'course',
                include: [
                    {
                        model: Evaluation,
                        as: 'evaluations'
                    },
                    {
                        model: Module,
                        as: 'modules',
                        include: [
                            {
                                model: Activity,
                                as: 'activities'
                            }
                        ]
                    }
                ]
            },
            {
                model: User,
                as: 'user'
            }
        ]
    }).catch((e, r) => {
        let u = e
    });

    res.json(enrollments)
}

