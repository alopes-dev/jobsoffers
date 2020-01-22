var express = require('express');
var router = express.Router();
const tipoDetalheController = require('../controllers/tipoDetalheController')

router.get('/:id', tipoDetalheController.getOne)

router.get('/', tipoDetalheController.getAll)

router.post('/', tipoDetalheController.insert)

router.put('/:id', tipoDetalheController.update)

router.delete('/:id', tipoDetalheController.delete)

module.exports = router