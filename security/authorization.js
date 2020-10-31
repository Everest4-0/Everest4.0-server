require("dotenv-safe").config();
var jwt = require('jsonwebtoken');
let { User } = require('../models/models')
class Authorization {
    constructor() { }
    getUser(req, res, next) {


    }
    getCurentUserToken = async (req, res, next) => {

        var token = req.headers['x-access-token'];
        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

        let data = jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

            // se tudo estiver ok, salva no request para uso posterior
            req.userId = decoded.id;
            return decoded;
        });

        let user = await User.findOne({ where: { apiKey: decoded } })

        return data
    }
    generateToken(req, res, next) {
        const id = 1; //esse id viria do banco de dados
        var token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 300 // expires in 5min
        });
        res.set('x-access-token', token)
        return res.json({ auth: true, token: token });
    }
    setToken(req, res, next) { }
    validateAccessToken(req, res, next) {
        var token = req.headers['x-access-token'];
        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

            // se tudo estiver ok, salva no request para uso posterior
            req.userId = decoded.id;
            next();
        });
    }
}
