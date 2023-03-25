var {
    UserEvaluation,
    User,
    Evaluation,
    EvaluationRequest
} = require('../../models/models');
const { paginate } = require('../global/paginator/paginator.controller');

exports.create = async (req, res) => {

    req.body.userId = req.user.id
    req.body.requesterId = req.body.requester.id
    req.body.requestedId = req.body.requested.id
    req.body.evaluationId = req.body.evaluation.id
    req.body.requestId = req.body.request.id
    let userEvaluations = await UserEvaluation.create(req.body);
    res.json(userEvaluations)
}

exports.update = async (req, res) => {

    let userEvaluations = UserEvaluation.update({
        lastName: "Doe"
    }, {
        where: {
            lastName: null
        }
    });
    res.json({
        status: 200,
        message: "success",
        data: userEvaluations
    });
}

exports.delete = async (req, res) => {


    let userEvaluations = await UserEvaluation.findAll({
        where: {
            userId: req.user.id,
        },
        include: {
            model: Evaluation,
            as: 'evaluation',
            where: {
                group: req.body.group
            }
        }
    })

    userEvaluations.forEach(e => {
        e.destroy()
    });

    res.json({
        status: 200,
        message: "sucess",
        data: userEvaluations
    });
}

exports.one = async (req, res) => {

    let userEvaluations = await UserEvaluation.findOne();
    res.json({
        status: 200,
        message: "sucess",
        data: userEvaluations
    })

}

exports.allBy = async (req, res) => {

    let filter = req.query

    const where = filter,
        include = [{
                model: User,
                as: 'requester'
            },
            {
                model: User,
                as: 'requested'
            },
            {
                model: Evaluation,
                as: 'evaluation'
            },
            {
                model: EvaluationRequest,
                as: 'request'
            }
        ]

    const userEvaluations = await paginate({
        Model: UserEvaluation,
        where,
        include,
        ...req.query
    })

    res.json(userEvaluations)
}