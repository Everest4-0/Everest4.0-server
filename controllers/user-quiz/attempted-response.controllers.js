var {Answer, AttemptedResponse} = require('../../models/quizes/user-quiz/quiz');
var {User} = require("../../models/main/user");

exports.create = async (req, res) => {
    //req.body.group = req.body.group.code
    req.body.userId = req.body.user.id;
    req.body.answerId = req.body.answer.id;

    let attResp = await AttemptedResponse.create(req.body).catch((e, AttemptedResponse) => {
        res.status(400).json(e || AttemptedResponse)
    });
    
    res.json(attResp)
}

exports.update = async (req, res) => {

    await AttemptedResponse.update(req.body, {
        where: {
            id: req.body.id
        }
    });

    let attResp = await AttemptedResponse.findByPk(req.body.id, {
        include: [
            {
                model: Quiz,
                as: 'quiz',
                include: [
                    {
                        model: User,
                        as: 'user'
                    },
                    
                ]
            }
        ],
        include: [
            {
                model: Answer,
                as: 'answer'
            }
        ]
    }).catch(e => {
        let i = e
    });
    res.json(attResp);
    
}

exports.delete = async (req, res) => {
    let attResp = AttemptedResponse.destroy({ where: { id: req.params.id } })
    res.json({
        status: 200,
        message: "sucess",
        data: attResp
    });
}

exports.one = async (req, res) => {

    let attResp = await AttemptedResponse.findByPk(req.params.id, {
        include: [
            {
                model: Quiz,
                as: 'quiz',
                include: [
                    {
                        model: User,
                        as: 'user'
                    },
                    
                ]
            }
        ],
        include: [
            {
                model: Answer,
                as: 'answer'
            }
        ]
    });
    
    res.json(attResp)
}

exports.allBy = async (req, res) => {

    let filter = req.query

    let attResps = await AttemptedResponse.findAll({
        where: filter,
        include: [
            {
                model: Quiz,
                as: 'quiz',
                include: [
                    {
                        model: User,
                        as: 'user'
                    },
                    
                ]
            }
        ],
        include: [
            {
                model: Answer,
                as: 'answer'
            }
        ]
    }).catch((e, r) => {
        let u = e
    });

    res.json(attResps)
}