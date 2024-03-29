var {
    ProfessionalExperience
} = require('../../models/models');
const {
    v4: uuid
} = require('uuid');
const { paginate } = require('../global/paginator/paginator.controller');
exports.create = async (req, res) => {
    let professionalExperience = await ProfessionalExperience.create(req.body);
    res.json(professionalExperience)
}

exports.update = async (req, res) => {

    let professionalExperience = ProfessionalExperience.update(req.body, {
        where: {
            id: req.body.id
        }
    });
    res.json(professionalExperience);
}

exports.delete = async (req, res) => {
    let professionalExperience = ProfessionalExperience.destroy({})
    res.json({
        status: 200,
        message: "sucess",
        data: professionalExperience
    });
}

exports.one = async (req, res) => {

    let professionalExperience = await ProfessionalExperience.findByPk(req.params.id);
    res.json(professionalExperience)

}

exports.allBy = async (req, res) => {
    
    const order = ['from', 'DESC']

    const professionalExperiences = await paginate({
        Model: ProfessionalExperience,
        order,
        ...req.query
    })

    res.json(professionalExperiences)
}