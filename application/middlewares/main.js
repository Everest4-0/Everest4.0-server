//var toobusy = require('toobusy-js');

//var ExpressBrute = require('express-brute');

//var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
//var bruteforce = new ExpressBrute(store);

//var csrf = require('csurf');

const { User } = require("../../models/models")

//const config = require('../config/app.json');

const jwt = require('jsonwebtoken')

const serverJWT_secret = "We Have To Set A Strong Secret And Store It On A Secure Place"

class Main {

    constructor() {

    }

    // static csrfProtection = csrf({ cookie: true });

    //static bruteforcePrevent = bruteforce.prevent;

    /* static serverAvailability = (req, res, next) => {
         if (toobusy()) {
             // log if you see necessary
             res.send(503, "Server Too Busy");
         } else {
             next();
         }
     }*/
     
    static validateClientAuth = (req, res, next) => {
        let token = req.headers['apikey']
    }

    static validateUserAuthToken = (req, res, next) => {
        if(req.url.split('authenticate').length>1) {
           return next();
        }

        let token = req.headers['authorization']
        if (typeof token === 'string' && token.split(' ').length < 2) {
            res.sendStatus(403)
        }
        jwt.verify(token.split(' ')[1], serverJWT_secret, async (err, decoded) => {
            if (err) {
                res.sendStatus(403)
            } else {
                req.user = await User.findOne({ where: { email: decoded } })
                next()
                return true
            }
        })


    }
}

module.exports = Main;