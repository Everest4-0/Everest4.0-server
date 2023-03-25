var {
    CoachingDuration
} = require("../../models/models");
const { paginate } = require("../global/paginator/paginator.controller");

exports.create = async (req, res) => {

    let coaching_duration = await CoachingDuration.create(req.body).catch((e, coaching_duration) => {
        res.status(400).json(e || coaching_duration)
    });

    res.json(coaching_duration)
}

exports.update = async (req, res) => {
    await CoachingDuration.update(req.body, {
        where: {
            id: req.body.id
        }
    })

    let coaching_duration = await CoachingDuration.findByPk(req.body.id, {}).catch(e => {
        let i = e
    })
    res.json(coaching_duration);
}

exports.delete = async (req, res) => {
    let coaching_duration = await CoachingDuration.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json({
        status: 200,
        message: "sucess",
        data: coaching_duration
    })
}

exports.one = async (req, res) => {

    let coaching_duration = await CoachingDuration.findByPk(req.params.id, {});
    res.json(coaching_duration)
}

exports.allBy = async (req, res) => {

    const coaching_durations = await paginate({
        Model: CoachingDuration,
        ...req.query
    })

    res.json(coaching_durations)
}