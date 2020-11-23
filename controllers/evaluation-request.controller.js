var { EvaluationRequest, Evaluation, User, Op, UserEvaluation } = require('../models/models');

exports.create = async (req, res) => {
    req.body.requesterId = req.body.requester.id
    req.body.requestedId = req.body.requested.id
    let evaluations = await EvaluationRequest.create(req.body).catch((e, r) => {
        let h = e;
    });
    res.json(evaluations)
}

exports.update = async (req, res) => {

    let evaluations = EvaluationRequest.update({ lastName: "Doe" }, {
        where: {
            lastName: null
        }
    });
    res.json({
        status: 200,
        message: "sucess",
        data: evaluations
    });
}

exports.delete = async (req, res) => {
    let evaluations = EvaluationRequest.destroy({})
    res.json({
        status: 200,
        message: "sucess",
        data: evaluations
    });
}

exports.one = async (req, res) => {

    let evaluations = await EvaluationRequest.findOne();
    res.json({
        status: 200,
        message: "sucess",
        data: evaluations
    })

}

exports.allBy = async (req, res) => {

    /*
     let filter = {}
 
     if (req.query['$filter']) {
         filter=[
             {requestedId: req.query['$filter']},
             {requesterId: req.query['$filter']}
         ]
     }*/


    let evaluations = await EvaluationRequest.findAll({
        where: req.query,
        include: [
            {
                model: User,
                as: 'requester'
            },
            {
                model: User,
                as: 'requested'
            },
            {
                model: UserEvaluation,
                as: 'evaluations',
                include: [

                    {
                        model: Evaluation,
                        as: 'evaluation'
                    },
                    {
                        model: EvaluationRequest,
                        as: 'request'
                    }
                ]
            }
        ]
    }).catch((e, r) => {
        let u = e
    });
    res.json(evaluations)
}