var {EvaluationRequest, Evaluation, User, Op} = require('../models/models');

exports.create = async (req, res) => {
    req.body.requesterId=req.body.requester.id
    req.body.requestedId=req.body.requested.id
    let evaluations = await EvaluationRequest.create(req.body);
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

   
    let filter = {}

    if (req.query['$filter']) {
        filter=[
            {requestedId: req.query['$filter']},
            {requesterId: req.query['$filter']}
        ]
    }


    let  evaluations = await EvaluationRequest.findAll({
        where:{[Op.or]:filter},
        include: [
            {
                model: User,
                as: 'requested'
            },
            {
                model: User,
                as: 'requester'
            },
            {
                model: Evaluation,
                as: 'evaluation'
            }
        ]
    }).catch((e,r)=>{
        let u=e
    });
    res.json(evaluations)
}