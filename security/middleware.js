let jwt = require('jsonwebtoken');
const config = require('./app.json');
var fs = require('fs')
const publicKey = fs.readFileSync('./config/public.key');

let checkToken = (req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*");

    return next();
};
let getCurentUserToken = async (req, res, next) => {

    var token = req.headers['x-access-token'];
    
    if (!token) return next();

    jwt.verify(token, process.env.SECRET, function (err, decoded) {

        req.user = await User.findOne({ where: { apiKey: decoded } });

        next()

    });
}
let generateToken = (req, res, next) => {
    const id = 1; //esse id viria do banco de dados
    var token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
    });
    res.set('x-access-token', token)
    return res.json({ auth: true, token: token });
}
let setToken = (req, res, next) => { }
let validateAccessToken = (req, res, next) => {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    });
}
module.exports = {
    checkToken: checkToken
}