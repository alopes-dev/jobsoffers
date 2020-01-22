var express = require('express');
var router = express.Router();
const db = require('../api/database/dbSetting')
const userController = require('../api/controllers/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
    userController.getAll(req, res, next);
});

router.get('/:id', function(req, res, next) {
    userController.getOne(req, res, next);
});

router.get('/add', function(req, res, next) {
    let data = new Date(Date.now())
    const uuid = require('uuid/v4')
    let obj = {
        Id: uuid(),
        Designacao: "Salomão Satuta",
        CreatedAt: data,
        UpdatedAt: data
    }
    user.create(obj).then(e => {
            res.send(e);
        })
        .catch(err => console.log(err))

});

module.exports = router;