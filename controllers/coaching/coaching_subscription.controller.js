var {
    CoachingSubscription,
    CoachingGoal,
    CoachingDuration,
    Chat,
    User,
    PersonalData,
    Note,
    ChatMessage,
    Enrollment,
    Course,
    ToDo,
    Charge
} = require("../../models/models")
const { paginate } = require("../global/paginator/paginator.controller")

exports.create = async (req, res) => {

    req.body.userId = req.user.id
    req.body.paymentId = req.body.payment.id
    req.body.durationId = req.body.duration.id
    //req.body.goalId = req.body.goal.id

    let coaching_subscription = await CoachingSubscription.create(req.body)
        .catch((e, coaching_subscription) => {
            res.status(400).json(e || coaching_subscription)
        });

    res.json(coaching_subscription)
}


exports.update = async (req, res) => {

    if (req.body.coach) {
        req.body.coachId = req.body.coach.id;
    }
    if (req.body.enrollment) {
        req.body.enrollmentId = req.body.enrollment.id
    }
    if (req.body.goal) {
        req.body.goalId = req.body.goal.id
        req.body.isActive = true;
    }


    if (req.query.add_todo) {
        let todo = await ToDo.findByPk(req.query.todoId)

        let subscription = await CoachingSubscription.findByPk(req.body.id)

        subscription.addTodo(todo);
        subscription.save()

        return res.json(subscription);
    }
    await CoachingSubscription.update(req.body, {
        where: {
            id: req.body.id
        }

    })

    let subscription = await CoachingSubscription.findByPk(req.body.id, {
        include: [{
                model: User,
                as: 'user'
            },
            {
                model: Chat,
                as: 'chat'
            },
            {
                model: User,
                as: 'coach'
            },
            {
                model: ToDo,
                as: 'todos'
            },
            {
                model: Note,
                as: 'notes',
                include: [

                    {
                        model: User,
                        as: 'user'
                    }
                ]
            },
            {
                model: Enrollment,
                as: 'enrollment',
                include: [{
                    model: Course,
                    as: 'course'
                }]
            },
            {
                model: CoachingGoal,
                as: 'goal'
            },
            {
                model: Charge,
                as: 'payment'
            }
        ]
    }).catch(e => {
        let i = e
    })

    if (req.body.coach && subscription.chat == null) {
        let chat = await Chat.create({
            from_user_id: subscription.coachId,
            to_user_id: subscription.userId
        })
        subscription.chatId = chat.id
        subscription.save()
    }

    res.json(subscription);
}

exports.delete = async (req, res) => {
    let coaching_subscription = await CoachingSubscription.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json({
        status: 200,
        message: "sucess",
        data: coaching_subscription
    })
}

exports.one = async (req, res) => {


    let subscription = await CoachingSubscription.findByPk(req.params.id, {
        include: [{
                model: User,
                as: 'user'
            },
            {
                model: Chat,
                as: 'chat'
            },
            {
                model: User,
                as: 'coach'
            },
            {
                model: ToDo,
                as: 'todos'
            },
            {
                model: Note,
                as: 'notes',
                include: [

                    {
                        model: User,
                        as: 'user'
                    }
                ]
            },
            {
                model: Enrollment,
                as: 'enrollment',
                include: [{
                    model: Course,
                    as: 'course'
                }]
            },
            {
                model: CoachingGoal,
                as: 'goal'
            },
            {
                model: Charge,
                as: 'payment'
            }
        ]
    })
    res.json(subscription)
}

exports.allBy = async (req, res) => {

    let filter = req.query

    const where = filter,
        include = [

            {
                model: User,
                as: 'user',
                include: [{
                    model: PersonalData,
                    as: 'datas'

                }]
            },
            {
                model: CoachingDuration,
                as: 'duration'
            },
            {
                model: Chat,
                as: 'chat',
                include: [{
                    model: ChatMessage,
                    as: 'messages'
                }, {
                    model: User,
                    as: 'to',
                    include: [{
                        model: PersonalData,
                        as: 'datas'

                    }]
                }, {
                    model: User,
                    as: 'from',
                    include: [{
                        model: PersonalData,
                        as: 'datas'

                    }]
                }]
            },
            {
                model: User,
                as: 'coach'
            },
            {
                model: CoachingGoal,
                as: 'goal'
            },
            {
                model: Charge,
                as: 'payment'
            }
        ]

    const coaching_subscriptions = await paginate({
        Model: CoachingSubscription,
        where,
        include,
        ...req.query
    })

    res.json(coaching_subscriptions)
}



exports.addTodo = async (req, res) => {

    let todo = await ToDo.findByPk(req.query.todoId)

    let subscription = await CoachingSubscription.findByPk(req.params.id)

    subscription.addTodo(todo);
    subscription.save()

    res.json(subscription)
}