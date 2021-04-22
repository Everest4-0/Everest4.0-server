const fs = require('fs');

const readLog = () => {
    const logFile = './logs/access.log';
    return new Promise((resolve, reject) => {
        fs.readFile(logFile, 'utf8', (err, contents) => {
            if(err) { reject(err); }
            resolve(contents.toString().split(/\n/).reverse());
        });
    });
};


module.exports = readLog;