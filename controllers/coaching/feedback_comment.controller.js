var {
    User,
    FeedbackComment,
    FeedbackPoint,
    FeedbackItem,
    PersonalData
} = require('../../models/models');
const { paginate } = require('../global/paginator/paginator.controller');

exports.create = async (req, res) => {
    //req.body.group = req.body.group.code
    req.body.userId = req.user.id
    req.body.feedbackId = req.body.feedback.id
    let comment = await FeedbackComment.create(req.body).catch((e, comment) => {
        res.status(400).json(e || comment)
    });
    comment = await FeedbackComment.findByPk(comment.id, {
        include: [{
            model: User,
            as: 'user',
            include: [{
                model: PersonalData,
                as: 'datas'
            }]

        }]
    })
    res.json(comment)
}

exports.update = async (req, res) => {

    await FeedbackComment.update(req.body, {
        where: {
            id: req.body.id
        }
    });
    let comment = await FeedbackComment.findByPk(req.body.id, {}).catch(e => {
        let i = e
    });
    res.json(comment);
}

exports.delete = async (req, res) => {
    let comment = FeedbackComment.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json({
        status: 200,
        message: "sucess",
        data: comment
    });
}

exports.one = async (req, res) => {

    let comment = await FeedbackComment.findByPk(req.params.id, {
        include: [{
                model: User,
                as: 'user'
            },
            {
                model: FeedbackPoint,
                as: 'points',
                include: [{
                    model: FeedbackItem,
                    as: 'item'
                }]
            }
        ]
    });
    res.json(comment)
}

exports.allBy = async (req, res) => {

    let filter = {
        ...req.query,
        ...{}
    }

    const where = filter,
        include = [{
            model: User,
            as: 'user',
            include: [{
                model: PersonalData,
                as: 'datas'
            }]

        }]

    const comments = await paginate({
        Model: FeedbackComment,
        where,
        include,
        ...req.query
    })

    res.json(comments)
}