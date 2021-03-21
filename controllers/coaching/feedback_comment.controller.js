var { User, FeedbackComment, FeedbackPoint, FeedbackItem, PersonalData } = require('../../models/models');

exports.create = async (req, res) => {
    //req.body.group = req.body.group.code
    req.body.userId = req.user.id
    req.body.feedbackId = req.body.feedback.id
    let feedback = await FeedbackComment.create(req.body).catch((e, comment) => {
        res.status(400).json(e || comment)
    });

    req.body.points.forEach(async point => {
        point.feedbackId = feedback.id
        point.itemId = point.item.id
        await FeedbackPoint.create(point).catch((e, comment) => {
            let err = e
        })
    })
    res.json(comment)
}

exports.update = async (req, res) => {

    await FeedbackComment.update(req.body, {
        where: {
            id: req.body.id
        }
    });
    let comment = await FeedbackComment.findByPk(req.body.id, {
    }).catch(e => {
        let i = e
    });
    res.json(comment);
}

exports.delete = async (req, res) => {
    let comment = FeedbackComment.destroy({ where: { id: req.params.id } })
    res.json({
        status: 200,
        message: "sucess",
        data: comment
    });
}

exports.one = async (req, res) => {

    let comment = await FeedbackComment.findByPk(req.params.id, {
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
    res.json(comment)
}

exports.allBy = async (req, res) => {

    let filter = { ...req.query, ...{} }

    let comments = await FeedbackComment.findAll({
        where: filter,
        order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ['createdAt', 'ASC']
        ],
        include: [
            {
                model: User,
                as: 'user',
                include: [
                    {
                        model: PersonalData,
                        as: 'datas'
                    }
                ]

            },
            {
                model: Feedback,
                as: 'feedback',

            }
        ]
    }).catch((e, r) => {
        let u = e
    });

    res.json(comments)
}