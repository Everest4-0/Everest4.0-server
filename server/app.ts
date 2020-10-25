import express = require('express');
// Create a new express app instance
const app: express.Application = express();
app.get('/', function (req, res) {
    res.send('Everest 4.0 - sc!');
});
app.listen(3000, function () {
    console.log('Everest4.0 -server side is listening on port 3000!');
});