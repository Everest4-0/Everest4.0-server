var { User, Quiz, Answer, updateOrCreate } = require('../../models/models');


exports.create = async (req, res) => {
    //req.body.group = req.body.group.code
    req.body.userId = req.body.user.id
    let quiz = await Quiz.create(req.body).catch((e, Quiz) => {
        res.status(400).json(e || Quiz)
    });

    req.body.answers.forEach(async a => {
        a.quizId = quiz.id
        await Answer.create(a)
    })
    res.json(quiz)
}

exports.update = async (req, res) => {

    req.body.answers.forEach(answer => {
        answer.quizId = req.body.id
        updateOrCreate(Answer, { id: answer.id || null }, answer)
    })
    let quiz = await Quiz.update(req.body, {
        where: {
            id: req.body.id
        }
    });

    res.json(quiz);
}

exports.delete = async (req, res) => {
    let quiz = Quiz.destroy({ where: { id: req.params.id } })
    res.json({
        status: 200,
        message: "sucess",
        data: quiz
    });
}

exports.one = async (req, res) => {

    let quiz = await Quiz.findByPk(req.params.id, {
        include: [
            {
                model: User,
                as: 'user'
            },
            {
                model: Answer,
                as: 'answers'
            }
        ]
    });
    res.json(quiz)
}

exports.allBy = async (req, res) => {

    let filter = req.query

    let quizes = await Quiz.findAll({
        where: filter,
        include: [
            {
                model: User,
                as: 'user'
            },
            {
                model: Answer,
                as: 'answers',
                include:[
                    {
                        model: User,
                        as: 'users'
                    }
                ]
            }
        ]
    }).catch((e, r) => {
        let u = e
    });

    res.json(quizes)
}