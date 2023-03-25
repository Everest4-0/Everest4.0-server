var {Role} = require('../../models/models');
const { paginate } = require('../global/paginator/paginator.controller');

exports.create = async (req, res) => {
    let role = await Role.create(req.body);
    res.json({
        status: 200,
        message: "success",
        data: role
    })
}

exports.update = async (req, res) => {

    let role = Role.update({ lastName: "Doe" }, {
        where: {
            lastName: null
        }
    });
    res.json({
        status: 200,
        message: "sucess",
        data: role
    });
}

exports.delete = async (req, res) => {
    let role = Role.destroy({})
    res.json({
        status: 200,
        message: "sucess",
        data: role
    });
}

exports.one = async (req, res) => {

    let role = await Role.findOne();
    res.json({
        status: 200,
        message: "sucess",
        data: role
    })

}

exports.allBy = async (req, res) => {

    const roles = await paginate({
        Model: Role,
        ...req.query
    })

    res.json(roles)
}