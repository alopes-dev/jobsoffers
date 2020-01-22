var express = require('express');
var router = express.Router();
const curriculoController = require('../controllers/curriculoController')

router.get('/:id', curriculoController.getOne)

router.get('/', curriculoController.getAll)

router.post('/', curriculoController.insert)

router.put('/:id', curriculoController.update)

router.delete('/:id', curriculoController.delete)

module.exports = router