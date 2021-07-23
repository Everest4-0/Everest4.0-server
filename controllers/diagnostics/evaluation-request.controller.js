const Email = require('../../application/mail/mail');
var { EvaluationRequest, Evaluation, User,  UserEvaluation, PersonalData } = require('../../models/models');

exports.create = async (req, res) => {
    req.body.requesterId = req.body.requester.id
    req.body.requestedId = req.body.requested.id
    if(req.body.requestedId!==undefined){
//        let requested=await User.create({email:req.body.requested.email})
        let requested=await User.findAll({where:{email:req.body.requested.email}})
        req.body.requestedId=requested.id;
        let email=new Email({
            to:req.body.requested.email,
            subject:'Evaluation Request',
            template:'evaluation_request',
            data:{
                from:req.body.requester,
                to:requested
            }
        })
        email.send((e,s)=>{

            let t=e
        })
    }

    let evaluations = await EvaluationRequest.create(req.body).catch((e, r) => {
        let h = e;
    });
    res.json(evaluations)
}

exports.update = async (req, res) => {

    let evaluations = EvaluationRequest.update(req.body, {
        where: {
            id:req.body.id
        }
    });
    res.json(evaluations);
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
                as: 'requester',
                include: [

                    {
                        model: PersonalData,
                        as: 'datas'
                    }]
            },
            {
                model: User,
                as: 'requested',
                include: [

                    {
                        model: PersonalData,
                        as: 'datas'
                    }]
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
