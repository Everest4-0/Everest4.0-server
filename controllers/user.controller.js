var { User, Role } = require('../models/models');
//var { LOCAL_PROVIDER } = require('../models/constants.js')

exports.create = async (req, res) => {
    let user = await User.create(req.body).catch((e,user)=>{
        res.status(400).json(e||user)
    });
    res.json(user)
}

exports.update = async (req, res) => {

    await User.update(req.body, {
        where: {
            id: req.body.id
        }
    });
    let user = await User.findByPk(req.body.id, {
        include: [
            {
                model: Role,
            }
        ]
    });
    res.json(user);
}

exports.delete = async (req, res) => {
    let user = User.destroy({ where: { id: req.params.id } })
    res.json({
        status: 200,
        message: "sucess",
        data: user
    });
}

exports.one = async (req, res) => {

    let user = await User.findByPk(req.params.id, {
        include: [
            {
                model: Role,
            }
        ]
    });
    res.json(user)
}

exports.authenticate = async (req, res) => {

    let user = await User.findOne({ where: { email: req.body.email } }, {
        include: [
            {
                model: Role,
            }
        ]
    });

    
    if (!user && req.body.provider !== 'LOCAL')
        user = await User.create(req.body);
    else if (!user)
        res.status(404)
    else if ( req.body.id || User.validatePassword(user,req.body.password)) 
        res.status(200)
    else 
        res.status(401)
        
    res.json(user)
}
exports.allBy = async (req, res) => {

    let users = await User.findAll({
        include: [
            {
                model: Role,
                as: 'role'
            }
        ]
    });
    //res.statusCode = 401
    res.json(users)
}

