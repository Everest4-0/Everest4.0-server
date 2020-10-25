let jwt = require('jsonwebtoken');
const config = require('./app.json');
var fs = require('fs')
const publicKey = fs.readFileSync('./config/public.key');

let checkToken = (req, res, next) => {

  res.header("Access-Control-Allow-Origin", "*");

  return next();
  res.set('Content-Type', 'application/json')

  let token = req.headers['x-access-token'] || req.headers['authorization'] || req.headers['x-api-key'] || ''; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, publicKey.toString(), config.verifyOptions, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid',
          data: decoded
        });
      } else {
        req.decoded = decoded;
        try {
          next();
        } catch (error) {

          res.json({
            status: 500,
            message: [],
            data: ''
          })
        }

      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkToken: checkToken
}