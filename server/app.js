var express = require('express'),
    config = require('../config/database'),
    middleware = require('../config/middleware'),

    //  { google } = require('googleapis'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    // routes
    routes = require('../routes/route');
const fs = require('fs');
const TOKEN_PATH = '../config/token.json';
//sect the mongoo connection string from config

const db = require("../models/models");
db.sequelize.sync();

// Init App
var app = express();
var server = require("http").Server(app);

app.use(cors())
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(bodyParser.json());
app.use(express.static('public'))


app.use('/api/v1/', middleware.checkToken, routes);
app.get('/', function (req, res) {
    res.send('Everes 4.0 - sc!');
});
app.set('port', (process.env.PORT || 9800));
app.set('address', '0.0.0.0');
server.listen(app.get('port'), app.get('address'), function () {
    console.log('Everest4.0 -server side is listening to ' + app.get('address') + ' port ' + app.get('port'));
});