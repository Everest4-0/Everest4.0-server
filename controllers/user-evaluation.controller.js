var {UserEvaluation} = require('../models/models');

exports.create = async (req, res) => {

    req.body.userId=req.body.user.id
    req.body.evaluatorId=req.body.evaluator.id
    req.body.evaluationId=req.body.evaluation.id
    let userEvaluations = await UserEvaluation.create(req.body);
    res.json(userEvaluations)
}

exports.update = async (req, res) => {

    let userEvaluations = UserEvaluation.update({ lastName: "Doe" }, {
        where: {
            lastName: null
        }
    });
    res.json({
        status: 200,
        message: "sucess",
        data: userEvaluations
    });
}

exports.delete = async (req, res) => {
    let userEvaluations = UserEvaluation.destroy({})
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

    let t;
    /* UserEvaluation.consts.forEach(async element => {
      t=   await UserEvaluation.create(element).catch(e=>{
        let i=e;
    })
     });*/
    let userEvaluations = await UserEvaluation.findAll()

    
    res.json(userEvaluations)
}