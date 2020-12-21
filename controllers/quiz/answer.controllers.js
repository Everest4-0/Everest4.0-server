var { Quiz, Answer } = require('../../models/models');
var {User} = require("../../models/main/user");

exports.create = async (req, res) => {
    //req.body.group = req.body.group.code
    req.body.quizId = req.body.quiz.id
    let answer = await Answer.create(req.body).catch((e, Answer) => {
        res.status(400).json(e || Answer)
    });
    res.json(answer)

    console.log(answer)
}

exports.update = async (req, res) => {

    await Answer.update(req.body, {
        where: {
            id: req.body.id
        }
    });
    let answer = await Answer.findByPk(req.body.id, {
        include: [
            {
                model: Quiz,
                as: 'quiz'
            }
        ]
    }).catch(e => {
        let i = e
    });
    res.json(answer);
}

exports.delete = async (req, res) => {
    let answer = Answer.destroy({ where: { id: req.params.id } })
    res.json({
        status: 200,
        message: "sucess",
        data: answer
    });
}

exports.one = async (req, res) => {

    let answer = await Answer.findByPk(req.params.id, {
        include: [
            {
                model: Quiz,
                as: 'quiz'
            }
        ]
    });
    res.json(answer)
}

exports.allBy = async (req, res) => {

    let filter = req.query

    let answers = await Answer.findAll({
        where: filter,
        include: [
            {
                model: Quiz,
                as: 'quiz',
                include: [
                    {
                        model: User,
                        as: 'user'
                    }
                ]
            }
        ]
    }).catch((e, r) => {
        let u = e
    });

    res.json(answers)
}