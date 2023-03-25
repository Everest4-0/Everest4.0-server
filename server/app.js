var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    config = require('../config/database'),
    middleWare = require('../application/middlewares/main'),
    // routes
    routes = require('../routes/route'),
    fs = require('fs');

const readLog = require('../config/readlog');

const { ENV } = process.env
const db = require("../models/models");

var whitelist = ['http://localhost:4200', 'https://everest40.com', 'https://qld.everest40.com', 'https://application.qld.everest40.com', 'https://server.qld.everest40.com']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    methods: 'GET,PUT,POST,OPTIONS'
}

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
    res.send(`version 4.0 - sc! ${process.env.ENV.toLowerCase()}`);
});

// Add more routes here

// Error handler
app.use(function (err, req, res, next) {
    // All errors from async & non-async route above will be handled here
    let errors = [];

    if (err?.original?.code === "ER_NO_REFERENCED_ROW_2") {
        errors = [{ message: `${err.table} not founds`, fields: err.fields }];
    } else if (typeof err.message === "string") {
        errors = [{ message: err.message }];
    } else if (Array.isArray(err) && err.length > 0) {
        errors = err;
    } else if (Array.isArray(err)) {
        errors = [{ message: "Some thing wrong is happning" }];
    } else {
        errors = err.data;
    }

    res.status(err.code ?? 500).send(errors);
    console.warn({ status: err.code ?? 500, message: errors, meta: { req, res } })
});

// Error handler
// All errors from async & non-async route above will be handled here
app.use((req, res, next) => {
    res.status(404).json([{ message: "resource not found" }]);
    logger.warn({ message: "resource not found", meta: { req, res } })
});

app.use((err, req, res, next) => {
    const { status } = err;
    res.status(status).json(err);
    logger.info({ message: err, meta: { req, res } })
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