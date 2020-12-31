var {
    Activity
    , Op
    , Module
    , Evaluation,
    User,
    Activity,
    updateOrCreate,
    Course,
    ActivityTask,
    TaskAnswer,
    Answer
} = require('../../models/models');
const fs = require("fs");

exports.create = async (req, res) => {

    req.body.moduleId = req.body.module.id;
    let module = await Module.findByPk(req.body.module.id, {
        include: [
            { model: Course, as: 'course' }
        ]
    })

    if (req.body.attachment) {
        var base64Data = req.body.attachment.split('base64,')[1];
        if (base64Data !== undefined) {
            attachment = '/courses/' + module.course.code + '/attachment/cover-' + module.courseId.split('-')[0] + '.' + req.body.attachment.split(';')[0].split('/')[1];
            fs.mkdir('./public/courses/' + module.course.code + '/attachment', { recursive: true }, (err) => {
                if (err) throw err;

                fs.writeFile('public' + attachment, base64Data, 'base64', function (err) {
                    //course.save();
                });
            });
            req.body.attachment = attachment;
        }
    }
    let activity = await Activity.create(req.body,
        {
            include: [
                {
                    association: { target: ActivityTask, as: 'tasks' },

                    include: [
                        {
                            association: { target: TaskAnswer, as: 'answers' }
                        }
                    ]
                }
            ]
        }).catch((e, activity) => {
            res.status(400).json(e || activity)
        }).then(activity => {
            activity.tasks.forEach(task => {
                task.activityId = activity.id
                task.save()
                task.answers.forEach(answer => {
                    answer.taskId = task.id
                    answer.save()
                })
            })
            res.json(activity)
        });
    res.json(activity)
}

exports.update = async (req, res) => {
    let module = await Module.findByPk(req.body.moduleId, {
        include: [
            { model: Course, as: 'course' }
        ]
    })

    if (req.body.attachment) {
        var base64Data = req.body.attachment.split('base64,')[1];
        if (base64Data !== undefined) {
            attachment = '/courses/' + module.course.code + '/attachment/cover-' + module.courseId.split('-')[0] + '.' + req.body.attachment.split(';')[0].split('/')[1];
            fs.mkdir('./public/courses/' + module.course.code + '/attachment', { recursive: true }, (err) => {
                if (err) throw err;

                fs.writeFile('public' + attachment, base64Data, 'base64', function (err) {
                    //course.save();
                });
            });
            req.body.attachment = attachment;
        }
    }
    await Activity.update(req.body, {
        where: { id: req.body.id }
    }).catch(e => {
        let y = e;
    }).then(activity => {
        req.body.tasks.forEach(task => {
            updateOrCreate(ActivityTask, { id: task.id || null }, task)
            task.answers.forEach(answer =>
                updateOrCreate(TaskAnswer, { id: answer.id || null }, answer)
            )
        })
    });
    let activity = await Activity.findByPk(req.body.id, {
        include: [
            {
                model: Module,
                as: 'module',
            }, {
                model: ActivityTask,
                as: 'tasks',
                include: [
                    {
                        model: TaskAnswer,
                        as: 'answers'
                    }
                ]
            }
        ]
    });
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
                as: 'module',
            }, {
                model: ActivityTask,
                as: 'tasks',
                include: [
                    {
                        model: TaskAnswer,
                        as: 'answers'
                    }
                ]
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

