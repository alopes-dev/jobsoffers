var express = require('express');
var router = express.Router();
const curriculoDetalheController = require('../controllers/curriculoDetalheController')

router.get('/:id', curriculoDetalheController.getOne)

router.get('/', curriculoDetalheController.getAll)

router.post('/', curriculoDetalheController.insert)

router.put('/:id', curriculoDetalheController.update)

router.delete('/:id', curriculoDetalheController.delete)

module.exports = router