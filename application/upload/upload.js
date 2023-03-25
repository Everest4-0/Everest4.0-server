const path = require('path');
const multer = require('multer');

exports.type = (type) => {

    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, 'public/uploads/' + type);
        },
        filename: (req, file, callback) => {
            callback(null, Date.now() + file.originalname);
        }
    });
    
    return multer({ storage });
}
