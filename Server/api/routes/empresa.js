var express = require('express');
var router = express.Router();
const empresaController = require('../controllers/empresaController')

router.get('/:id', empresaController.getOne)

router.get('/', empresaController.getAll)

router.post('/', empresaController.insert)

router.put('/:id', empresaController.update)

router.delete('/:id', empresaController.delete)

module.exports = router