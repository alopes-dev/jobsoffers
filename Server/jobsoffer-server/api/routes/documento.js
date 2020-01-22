var express = require('express');
var router = express.Router();
const documentoController = require('../controllers/documentoController')

router.get('/:id', documentoController.getOne)

router.get('/', documentoController.getAll)

router.post('/', documentoController.insert)

router.put('/:id', documentoController.update)

router.delete('/:id', documentoController.delete)

module.exports = router