var { User, Feedback, FeedbackPoint, FeedbackItem } = require('../../models/models');

exports.create = async (req, res) => {
    //req.body.group = req.body.group.code
    req.body.userId = req.user.id
    req.body.subscriptionId = req.body.subscription.id
    let feedback = await Feedback.create(req.body).catch((e, feedback) => {
        res.status(400).json(e || feedback)
    });
    res.json(feedback)
}

exports.update = async (req, res) => {
    
    await Feedback.update(req.body, {
        where: {
            id: req.body.id
        }
    });
    let feedback = await Feedback.findByPk(req.body.id, {
    }).catch(e => {
        let i = e
    });
    res.json(feedback);
}

exports.delete = async (req, res) => {
    let feedback = Feedback.destroy({ where: { id: req.params.id } })
    res.json({
        status: 200,
        message: "sucess",
        data: feedback
    });
}

exports.one = async (req, res) => {

    let feedback = await Feedback.findByPk(req.params.id, {
        include: [
            {
                model: User,
                as: 'user'
            },
            {
                model: FeedbackPoint,
                as: 'points',
                include: [
                    {
                        model: FeedbackItem,
                        as: 'item'
                    }
                ]
            }
        ]
    });
    res.json(feedback)
}

exports.allBy = async (req, res) => {

    let filter = {...req.query,...{ userId: req.user.id }}

    let feedbacks = await Feedback.findAll({
        where: filter,
        include: [
            {
                model: User,
                as: 'user'
            },
            {
                model: FeedbackPoint,
                as: 'points',
                include: [
                    {
                        model: FeedbackItem,
                        as: 'item'
                    }
                ]
            }
        ]
    }).catch((e, r) => {
        let u = e
    });

    res.json(feedbacks)
}