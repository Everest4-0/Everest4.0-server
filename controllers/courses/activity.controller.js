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
            attachment = '/courses/' + module.course.code + '/attachment/att-' + module.courseId.split('-')[0] + '.' + req.body.attachment.split(';')[0].split('/')[1];
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
    });


    req.body.tasks.forEach(async task => {
        let tasky = await updateOrCreate(ActivityTask, { id: task.id || null }, { ...task, ...{ activityId: req.body.id } })
        task.answers.forEach(answer =>
            updateOrCreate(TaskAnswer, { id: answer.id || null }, { ...answer, ...{ taskId: tasky.id } })
        )
    })

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
    if (req.body.orderNo === 97 || req.body.orderNo === 96) {
        let next = await Activity.findAll({
            where: { orderNo: req.body.orderNo === 97 ? 96 : 97, createdAt: req.body.createdAt }
            , include: [{
                model: Module,
                as: 'module'
            }
            ]
        })

        next = next.filter(n => n.module.courseId === activity.module.courseId)[0]
        if (next) {
            next.duration = req.body.duration;
            next.save();
        }



        req.body.tasks.forEach(async task => {
            if (task.id) {
                await ActivityTask.destroy({
                    where: {
                        activityId: next.id
                    }
                })
            }
            task.id = null;
            await ActivityTask.create({ ...task, ...{ activityId: next.id } }).then(t => {
                task.answers.forEach(async answer =>
                    await TaskAnswer.create({ ...answer, ...{ id: null, taskId: t.id } })
                )
            }).catch(e => {
                let u = e
            })

        });
    }
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


exports.addUserAnswer = async (req, res) => {

    let user = await User.findByPk(req.body.id)
    req.body.taskAnswers.forEach(async t => {
        user.addTaskAnswer(await TaskAnswer.findByPk(t.id))
        user.save()
    })
}
exports.getUserAnswer = async (req, res) => {


    let user = await User.findByPk(req.query.userId,
        {
            include: [
                {
                    model: TaskAnswer,
                    as: 'taskAnswers',
                    include: [
                        {
                            model: ActivityTask,
                            as: 'task'
                        }
                    ]

                }],
            where: {
                '$taskAnswer.task.activityId$': req.query.activityId
            }
        })
    res.json(user.taskAnswers.filter(t => t.task.activityId === req.query.activityId))
}