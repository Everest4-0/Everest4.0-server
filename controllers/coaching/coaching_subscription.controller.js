
var { CoachingSubscription, CoachingGoal, CoachingDuration, Chat, User, PersonalData, Note, ChatMessage } = require("../../models/models")

exports.create = async (req, res) => {

    req.body.userId = req.user.id
    req.body.durationId = req.body.duration.id
    req.body.goalId = req.body.goal.id

    let coaching_subscription = await CoachingSubscription.create(req.body).catch((e, coaching_subscription) => {
        res.status(400).json(e || coaching_subscription)
    });

    res.json(coaching_subscription)
}

exports.update = async (req, res) => {

    req.body.coachId = req.body.coach.id
    await CoachingSubscription.update(req.body, {
        where: {
            id: req.body.id
        }

    })

    let subscription = await CoachingSubscription.findByPk(req.body.id, {
    }).catch(e => {
        let i = e
    })

    if (subscription.coachId !== null) {
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
    let coaching_subscription = await CoachingSubscription.destroy({ where: { id: req.params.id } })
    res.json({
        status: 200,
        message: "sucess",
        data: coaching_subscription
    })
}

exports.one = async (req, res) => {

    let subscription = await CoachingSubscription.findByPk(req.params.id, {
        include: [

            {
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
                model: Note,
                as: 'notes',
                include: [

                    {
                        model: User,
                        as: 'user'
                    }]
            },
            {
                model: CoachingGoal,
                as: 'goal'
            }
        ]
    });

    res.json(subscription)
}

exports.allBy = async (req, res) => {

    let filter = req.query
    let coaching_subscriptions = await CoachingSubscription.findAll({
        where: filter,
        include: [

            {
                model: User,
                as: 'user',
                include: [{
                    model: PersonalData,
                    as: 'datas'

                }]
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
            }
        ]
    }).catch((e, r) => {
        let u = e
    });

    res.json(coaching_subscriptions)
}