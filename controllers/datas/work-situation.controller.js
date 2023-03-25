var { WorkSituation } = require('../../models/models');
const { paginate } = require('../global/paginator/paginator.controller');

exports.create = async (req, res) => {
    let workSituation = await WorkSituation.create(req.body);
    res.json(workSituation)
}

exports.update = async (req, res) => {

    let workSituation = WorkSituation.update(req.body, {
        where: {
            id: req.body.id
        }
    });
    res.json(workSituation);
}

exports.delete = async (req, res) => {
    let workSituation = WorkSituation.destroy({})
    res.json({
        status: 200,
        message: "sucess",
        data: workSituation
    });
}

exports.one = async (req, res) => {

    let workSituation = await WorkSituation.findByPk(req.params.id);
    res.json(workSituation)

}

exports.allBy = async (req, res) => {

    const workSituations = await paginate({
        Model: WorkSituation,
        ...req.query
    })

    res.json(workSituations)
}