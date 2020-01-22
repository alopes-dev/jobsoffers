var express = require('express');
var router = express.Router();
const tipoDocumentoController = require('../controllers/tipoDocumentoController')

router.get('/:id', tipoDocumentoController.getOne)

router.get('/', tipoDocumentoController.getAll)

router.post('/', tipoDocumentoController.insert)

router.put('/:id', tipoDocumentoController.update)

router.delete('/:id', tipoDocumentoController.delete)

module.exports = router