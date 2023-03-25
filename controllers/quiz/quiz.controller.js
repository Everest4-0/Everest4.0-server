var {
    User,
    Quiz,
    Answer,
    updateOrCreate
} = require('../../models/models');
const {
    Sequelize
} = require('sequelize');
const {
    paginate
} = require('../global/paginator/paginator.controller');

exports.create = async (req, res) => {
    //req.body.group = req.body.group.code
    req.body.userId = req.body.user.id
    req.body.isActive = false;
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
        updateOrCreate(Answer, {
            id: answer.id || null
        }, answer)
    })
    let quiz = await Quiz.update(req.body, {
        where: {
            id: req.body.id
        }
    });

    res.json(quiz);
}

exports.delete = async (req, res) => {
    let quiz = Quiz.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json({
        status: 200,
        message: "sucess",
        data: quiz
    });
}

exports.one = async (req, res) => {

    let quiz = await Quiz.findByPk(req.params.id, {
        include: [{
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

    const where = filter,
        order = Sequelize.literal('rand()'),
        include = [{
                model: User,
                as: 'user'
            },
            {
                model: Answer,
                as: 'answers',
                include: [{
                    model: User,
                    as: 'users'
                }]
            }
        ]

    if (filter.rand) {

        const quizes = await paginate({
            Model: Quiz,
            where,
            include,
            order,
            ...req.query
        })

        res.json(quizes.sort(_ => Math.random() > .5 ? 1 : -1))

    } else {

       
        const quizes = await paginate({
            Model: Quiz,
            where,
            include,
            ...req.query
        })

        res.json(quizes)

    }

}