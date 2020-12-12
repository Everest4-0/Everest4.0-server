var {ProfessionalExperience} = require('../../models/models');
const { v4: uuid } = require('uuid')
exports.create = async (req, res) => {
    let professionalExperience = await ProfessionalExperience.create(req.body);
    res.json(professionalExperience)
}

exports.update = async (req, res) => {

    let professionalExperience = ProfessionalExperience.update({ lastName: "Doe" }, {
        where: {
            lastName: null
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

    let professionalExperience = await ProfessionalExperience.findOne();
    res.json(professionalExperience)

}

exports.allBy = async (req, res) => {

    let professionalExperiences = await ProfessionalExperience.findAll({ order: [
        // Will escape title and validate DESC against a list of valid direction parameters
        ['from', 'DESC']]});
    
    res.json(professionalExperiences)
}