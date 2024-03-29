var { AcademicLevel } = require('../../models/models');

const { v4: uuid } = require('uuid');
const { paginate } = require('../global/paginator/paginator.controller');

exports.create = async (req, res) => {
    let academicLevel = await AcademicLevel.create(req.body);
    res.json(academicLevel)
}

exports.update = async (req, res) => {

    let academicLevel = AcademicLevel.update(req.body, {
        where: {
            id: req.body.id
        }
    });
    res.json(academicLevel);
}

exports.delete = async (req, res) => {
    let academicLevel = AcademicLevel.destroy({})
    res.json({
        status: 200,
        message: "sucess",
        data: academicLevel
    });
}

exports.one = async (req, res) => {

    let academicLevel = await AcademicLevel.findByPk(req.params.id);
    res.json(academicLevel)

}

exports.allBy = async (req, res) => {

    const academicLevels = await paginate({
        Model: AcademicLevel,
        ...req.query
    })

    res.json(academicLevels)
}