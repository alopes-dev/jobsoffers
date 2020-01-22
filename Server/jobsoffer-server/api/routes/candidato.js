var express = require('express');
var router = express.Router();
const candidatoController = require('../controllers/candidatoController')

router.get('/:id', candidatoController.getOne)

router.get('/', candidatoController.getAll)

router.post('/', candidatoController.insert)

router.put('/:id', candidatoController.update)

router.delete('/:id', candidatoController.delete)

module.exports = router