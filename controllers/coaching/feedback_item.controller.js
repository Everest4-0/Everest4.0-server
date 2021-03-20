var { User, FeedbackItem, FeedbackPoint } = require('../../models/models');

exports.create = async (req, res) => {
    //req.body.group = req.body.group.code
    req.body.userId = req.user.id
    req.body.subscriptionId = req.body.subscription.id
    let feedback = await FeedbackItem.create(req.body).catch((e, feedback) => {
        res.status(400).json(e || feedback)
    });
    res.json(feedback)
}

exports.update = async (req, res) => {
    
    await FeedbackItem.update(req.body, {
        where: {
            id: req.body.id
        }
    });
    let feedback = await FeedbackItem.findByPk(req.body.id, {
    }).catch(e => {
        let i = e
    });
    res.json(feedback);
}

exports.delete = async (req, res) => {
    let feedback = FeedbackItem.destroy({ where: { id: req.params.id } })
    res.json({
        status: 200,
        message: "sucess",
        data: feedback
    });
}

exports.one = async (req, res) => {

    let feedback = await FeedbackItem.findByPk(req.params.id, {
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

    let filter = {...req.query,...{  }}

    let feedbacks = await FeedbackItem.findAll({
        where: filter
    }).catch((e, r) => {
        let u = e
    });

    res.json(feedbacks)
}