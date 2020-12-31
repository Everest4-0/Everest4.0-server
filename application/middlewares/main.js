var toobusy = require('toobusy-js');

var ExpressBrute = require('express-brute');

var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
var bruteforce = new ExpressBrute(store);

var csrf = require('csurf');

class Main {




    constructor() {

    }


    static csrfProtection = csrf({ cookie: true });

    static bruteforcePrevent = bruteforce.prevent;

    static serverAvailability = (req, res, next) => {
        if (toobusy()) {
            // log if you see necessary
            res.send(503, "Server Too Busy");
        } else {
            next();
        }
    }
}

module.exports = Main;