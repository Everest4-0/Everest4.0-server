var {
    ACL
} = require('../../models/models');
const { paginate } = require('../global/paginator/paginator.controller');

exports.create = async (req, res) => {
    let acl = await ACL.create(req.body);
    res.json({
        status: 200,
        message: "success",
        data: acl
    })
}

exports.update = async (req, res) => {

    let acl = ACL.update({
        lastName: "Doe"
    }, {
        where: {
            lastName: null
        }
    });
    res.json({
        status: 200,
        message: "sucess",
        data: acl
    });
}

exports.delete = async (req, res) => {
    let acl = ACL.destroy({})
    res.json({
        status: 200,
        message: "sucess",
        data: acl
    });
}

exports.one = async (req, res) => {

    let acl = await ACL.findOne();
    res.json({
        status: 200,
        message: "sucess",
        data: acl
    })

}

exports.allBy = async (req, res) => {

    const acls = await paginate({
        Model: ACL,
        ...req.query
    })

    res.json(acls)
}