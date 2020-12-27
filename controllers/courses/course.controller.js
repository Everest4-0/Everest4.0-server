var {
    Course
    , Op
    , Module
    , Evaluation,
    User,
    Enrollment,
    updateOrCreate,
    Activity
} = require('../../models/models');
const fs = require("fs");

exports.create = async (req, res) => {


    let modules = req.body.modules
    req.body.modules = null;
    let evaluations = req.body.evaluations;
    req.body.evaluations = null;
    let ev;
    let course = await Course.create(req.body).catch((e, course) => {
        res.status(400).json(e || course)
    });

    evaluations.forEach(async evaluation => {
        ev = await Evaluation.findByPk(evaluation.id);
        course.addEvaluations(ev)
    });

    var base64Data = req.body.cover.split('base64,')[1];
    if (base64Data !== undefined) {
        course.cover = '/courses/' + course.code + '/cover-' + course.id.split('-')[0] + '.' + req.body.cover.split(';')[0].split('/')[1];
        fs.mkdir('./public/courses/' + course.code, { recursive: true }, (err) => {
            if (err) throw err;

            fs.writeFile('public' + course.cover, base64Data, 'base64', function (err) {
                course.save();
            });
        });
    }
    modules.forEach(async module => {
        module.courseId = course.id
        let m = await Module.create(module)
    });

    res.json(course)
}

exports.update = async (req, res) => {

    let modules = req.body.modules
    req.body.modules = null;
    let evaluations = req.body.evaluations;
    req.body.evaluations = null;
    let ev = [];
    await Course.update(req.body, {
        where: { id: req.body.id }
    })
    let course = await Course.findByPk(req.body.id);

    evaluations.forEach(async evaluation => {
        ev.push(await Evaluation.findByPk(evaluation.id))
        if (ev.length === evaluations.length)
            course.setEvaluations(ev)
    });

    var base64Data = req.body.cover.split('base64,')[1];
    if (base64Data !== undefined) {
        course.cover = '/courses/' + course.code + '/cover-' + course.id.split('-')[0] + '.' + req.body.cover.split(';')[0].split('/')[1];
        fs.mkdir('./public/courses/' + course.code, { recursive: true }, (err) => {
            if (err) throw err;

            fs.writeFile('public' + course.cover, base64Data, 'base64', function (err) {
                course.save();
            });
        });
    }
    modules.forEach(async module => {
        module.courseId = course.id
        await updateOrCreate(Module, { id: module.id || null }, module)
    });

    res.json(course)
}

exports.delete = async (req, res) => {
    let course = Course.destroy(
        {
            where: {
                id: req.params.id
            }
        }
    )
    res.json(course);
}

exports.one = async (req, res) => {

    let course = await Course.findByPk(req.params.id, {
        include: [
            {
                model: Module,
                as: 'modules',
                include:[
                    {
                        model:Activity,
                        as: 'activities'
                    }
                ]
            },
            {
                model: User,
                as: 'user'
            },
            {
                model: Enrollment,
                as: 'enrollments'
            },
            {
                model: Evaluation,
                as: 'evaluations'
            }
        ]
    });
    res.json(course)
}


exports.allBy = async (req, res) => {

    let filter = {}

    if (req.query['$filter']) {
        filter = {
            [Op.or]: [
                {
                    title: { [Op.like]: '%' + req.query['$filter'].toLowerCase() + '%' }
                },
                {
                    descriptions: { [Op.like]: '%' + req.query['$filter'].toLowerCase() + '%' }
                }
            ]
        }
    }



    let courses = await Course.findAll({
        where: filter,
        include: [
            {
                model: Module,
                as: 'modules'
            },
            {
                model: User,
                as: 'user'
            },
            {
                model: Evaluation,
                as: 'evaluations'
            }
        ]
    }).catch((e, r) => {
        let u = e
    });

    if (req.query['$filter']) {
        let realteds = await Course.findAll({
            include: [
                {
                    model: Module,
                    as: 'modules', 
                    include: [
                        {
                            model: Activity,
                            as: 'activities'
                        }
                    ]
                },
                {
                    model: User,
                    as: 'user'
                },
                {
                    model: Evaluation,
                    as: 'evaluations',
                    where: {
                        name: { [Op.like]: '%' + req.query['$filter'].toLowerCase() + '%' }

                    }, include: [
                        {
                            model: Course,
                            as: 'courses'
                        }
                    ]

                }
            ]
        }).catch((e, r) => {
            let u = e
        });
        courses = courses.concat(realteds)
    }
    res.json(courses)
}

