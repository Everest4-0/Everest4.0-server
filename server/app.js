"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// Create a new express app instance
var app = express();
app.get('/', function (req, res) {
    res.send('Everest 4.0 - sc!');
});
app.listen(3000, function () {
    console.log('Everest4.0 -server side is listening on port 3000!');
});
