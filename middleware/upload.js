const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
    destination(req, file, callback) { // путь сохранения
        callback(null, 'uploads/');
    },
    filename(req, file, callback) {
        const date = moment().format('DDMMYYYY-HHmmss_SSS');
        callback(null, `${date}-${file.originalname}`);
    }
});

const fileFilter = (req, file, callback) => {
    switch (file.mimetype) {
        case 'image/png':
        case 'image/jpeg':
            callback(null, true);
            break;
        default:
            callback(null, false);
    }
};

const limits = {
    fileSize: 1024*1024*5,
};

module.exports = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits:limits,
});