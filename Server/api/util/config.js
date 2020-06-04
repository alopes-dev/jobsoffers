const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname, '..', 'tmp', 'upload'),
    storage: multer.diskStorage({
        destination: (_, __, cb) => {
            cb(null, path.resolve(__dirname, '..', 'tmp', 'upload'));
        },
        filename: (_, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                const fileName = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, fileName);
            });
        },
    }),
    limit: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (_, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
        ];

        if (allowedMimes.includes(file.mimetype)) cb(null, true);
        else cb(new Error('Invalid file type'));
    },
};