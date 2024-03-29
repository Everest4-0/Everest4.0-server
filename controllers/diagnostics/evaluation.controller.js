var {
    Evaluation,
    Course
} = require('../../models/models');
const {
    paginate
} = require('../global/paginator/paginator.controller');

exports.create = async (req, res) => {
    let evaluations = await Evaluation.create(req.body);
    res.json({
        status: 200,
        message: "success",
        data: evaluations
    })
}

exports.update = async (req, res) => {

    let evaluation = Evaluation.update(req.body, {
        where: {
            id: req.body.id
        }
    });
    res.json(evaluation);
}

exports.delete = async (req, res) => {
    let evaluations = Evaluation.destroy({})
    res.json({
        status: 200,
        message: "sucess",
        data: evaluations
    });
}

exports.one = async (req, res) => {

    let evaluations = await Evaluation.findByPk(req.params.id, {
        include: [{
            model: Course,
            as: 'courses'
        }]
    });
    res.json(evaluations)

}

exports.allBy = async (req, res) => {

    let filter = req.query;

    filter.isActive = true

    const where = filter,
        include = [{
            model: Course,
            as: 'courses'
        }]

    const evaluations = await paginate({
        Model: Evaluation,
        where,
        include,
        ...req.query
    })

    res.json(evaluations)
}