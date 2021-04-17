var { User, Feedback, FeedbackPoint, FeedbackItem } = require('../../models/models');

exports.create = async (req, res) => {
    //req.body.group = req.body.group.code
    req.body.userId = req.user.id
    req.body.subscriptionId = req.body.subscription.id
    let feedback = await Feedback.create(req.body).catch((e, feedback) => {
        res.status(400).json(e || feedback)
    });

    let p, points = []
    req.body.points.forEach(async point => {
        point.feedbackId = feedback.id
        point.itemId = point.item.id
        p = await FeedbackPoint.create(point).catch((e, feedback) => {
            let err = e
        })
        points.push(p)
        if (points.length === req.body.points.length) {
            feedback=await Feedback.findByPk(feedback.id,{
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
            })
            res.json(feedback)
        }
    })


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

    let filter = { ...req.query, ...{} }

    let feedbacks = await Feedback.findAll({
        where: filter,
        order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ['createdAt', 'ASC']
        ],
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