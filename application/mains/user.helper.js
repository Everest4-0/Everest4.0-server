const { User } = require("../../models/models")

const jwt = require('jsonwebtoken')

const serverJWT_secret = "We Have To Set A Strong Secret And Store It On A Secure Place"
class UserHelper {

    static currentUserAuthToken = async (key) => await User.find({ where: { email: key } });

    static generateUserAuthToken = (user) => 'Bearer ' + jwt.sign(user.email, serverJWT_secret)

    static validateUserAuthToken = (req, res, next) => {
        let token = req.headers['authorization']
        if (typeof token !== 'string' && token.split(' ').length < 2) {
            res.sendStatus(403)
        }
        jwt.verify(token.split(' ')[1], serverJWT_secret, (err, decoded) => {
            if (err) {
                res.sendStatus(403)
            } else {
                req.user = UserHelper.currentUserAuthToken(decoded)
                next()
            }
        })
    }

    static setUserAuthToken = (req, res) => {
        let user = req.user
        user.apikey = UserHelper.generateUserAuthToken(user)
        res.send(
            req.user
        )
    }

}

module.exports = UserHelper;