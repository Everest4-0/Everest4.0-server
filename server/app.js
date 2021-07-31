var express = require('express'),
    config = require('../config/database'),
    middleWare = require('../application/middlewares/main'),
    //  { google } = require('googleapis'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    // routes
    routes = require('../routes/route');
const fs = require('fs');


const readLog = require('../config/readlog');

const { User } = require('../models/models');
const TOKEN_PATH = '../config/token.json';
//sect the mongoo connection string from config

const db = require("../models/models");
db.sequelize.sync({ force: false });

const options = {
    key: fs.readFileSync('server/ssl/key.pem'),
    cert: fs.readFileSync('server/ssl/cert.pem')
};
// Init App
var app = express();
var server = require("http").Server(app);

app.set('view engine', 'ejs');

app.use(function (req, res, next) {
    res.io = io;
    next();
});

var whitelist = ['http://localhost:4200','https://everest40.com', 'https://qld.everest40.com', 'https://application.qld.everest40.com', 'https://server.qld.everest40.com']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true, methods: 'GET,PUT,POST,OPTIONS'
}
app.use(cors());


app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(bodyParser.json());
app.use(express.static('public'))
app.use('/static', express.static('public'))

app.get('/log', async (req, res) => {
    try {
        const entries = await readLog();
        res.render('log', { entries: entries });
    } catch (err) {
        res.sendStatus(500);
    }
});

app.use('/api/v1/', middleWare.validateUserAuthToken, routes);

app.get('/', function (req, res) {
    res.send('Everes 4.0 - sc!');
});

app.set('port', (process.env.PORT || 9800));
app.set('address', '0.0.0.0');
server = server.listen(app.get('port'), app.get('address'), function () {
    console.log('Everest4.0 -server side is listening to ' + app.get('address') + ' port ' + app.get('port'));
});

var io = require('socket.io')(server, {
    cors: {
        origin: whitelist,
        credentials: true
    }
});


io.on('connect', socket => {
    
    console.log('Socket: client connected--' + socket.id);
    io.sockets.sockets.forEach((client, data) => {
        let s = client;
        let d = data;
        client.id = client.handshake.auth.token
        // goes through all clients in room 'room' and lets you update their socket objects
    });
    console.log('Socket: client connected--' + socket.id);
});
