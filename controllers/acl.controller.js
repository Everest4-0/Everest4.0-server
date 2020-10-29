var {ACL} = require('../models/models');

exports.create = async (req, res) => {
    let acl = await ACL.create(req.body);
    res.json({
        status: 200,
        message: "success",
        data: acl
    })
}

exports.update = async (req, res) => {

    let acl = ACL.update({ lastName: "Doe" }, {
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

    let acls = await ACL.findAll({});
    //res.statusCode = 401
    res.json(acls)
}