var {User, Role} = require('../models/models');

exports.create = async (req, res) => {
    let user = await User.create(req.body);
    res.json({
        status: 200,
        message: "success",
        data: user
    })
}

exports.update = async (req, res) => {

    let user = User.update({ lastName: "Doe" }, {
        where: {
            lastName: null
        }
    });
    res.json({
        status: 200,
        message: "sucess",
        data: user
    });
}

exports.delete = async (req, res) => {
    let user = User.destroy({})
    res.json({
        status: 200,
        message: "sucess",
        data: user
    });
}

exports.one = async (req, res) => {

    let user = await User.findByPk(req.params.id,{
        include:[
            {
                model:Role,
            }
        ]
    });
    res.json(user)
}

exports.allBy = async (req, res) => {

    let users = await User.findAll({
        include:[
            {
                model:Role,
                as:'role'
            }
        ]
    });
    //res.statusCode = 401
    res.json(users)
}

