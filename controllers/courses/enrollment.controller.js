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
    req.body.userId = req.body.user.id;
    let enrollment = await Enrollment.create(req.body).catch((e, enrollment) => {
        res.status(400).json(e || enrollment)
    });
    res.json(enrollment)
}

exports.update = async (req, res) => {

    let modules = req.body.modules
    req.body.modules = null;
    let evaluations = req.body.evaluations;
    req.body.evaluations = null;
    let ev = [];
    await Enrollment.update(req.body, {
        where: { id: req.body.id }
    })
    let enrollment = await Enrollment.findByPk(req.body.id);

    evaluations.forEach(async evaluation => {
        ev.push(await Evaluation.findByPk(evaluation.id))
        if (ev.length === evaluations.length)
            enrollment.setEvaluations(ev)
    });

    var base64Data = req.body.cover.split('base64,')[1];
    if (base64Data !== undefined) {
        enrollment.cover = '/courses/' + enrollment.code + '/cover-' + enrollment.id.split('-')[0] + '.' + req.body.cover.split(';')[0].split('/')[1];
        fs.mkdir('./public/courses/' + enrollment.code, { recursive: true }, (err) => {
            if (err) throw err;

            fs.writeFile('public' + enrollment.cover, base64Data, 'base64', function (err) {
                enrollment.save();
            });
        });
    }
    modules.forEach(async module => {
        module.courseId = enrollment.id
        await updateOrCreate(Module, { id: module.id || null }, module)
    });

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

