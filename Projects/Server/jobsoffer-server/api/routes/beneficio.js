var express = require('express');
var router = express.Router();
const beneficioController = require('../controllers/beneficioController')

router.get('/:id', beneficioController.getOne)

router.get('/', beneficioController.getAll)

router.post('/', beneficioController.insert)

router.put('/:id', beneficioController.update)

router.delete('/:id', beneficioController.delete)

module.exports = router