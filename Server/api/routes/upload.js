const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('../util/config');

routes.post('/uploads', multer(multerConfig).single('file'), (req, res) => {
    console.log(req);

    return res.json({ hallo: 'Offers' });
});

module.exports = routes;