var {AcademicLevel} = require('../../models/models');
const { v4: uuid } = require('uuid')
exports.create = async (req, res) => {
    let academicLevel = await AcademicLevel.create(req.body);
    res.json(academicLevel)
}

exports.update = async (req, res) => {

    let academicLevel = AcademicLevel.update({ lastName: "Doe" }, {
        where: {
            lastName: null
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

    let academicLevel = await AcademicLevel.findOne();
    res.json(academicLevel)

}

exports.allBy = async (req, res) => {

    let academicLevels = await AcademicLevel.findAll({});
    
    res.json(academicLevels)
}