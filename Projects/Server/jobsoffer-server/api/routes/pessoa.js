var express = require('express');
var router = express.Router();
const pessoaController = require('../controllers/pessoaController')

router.get('/:id', pessoaController.getOne)

router.get('/', pessoaController.getAll)

router.post('/', pessoaController.insert)

router.put('/:id', pessoaController.update)

router.delete('/:id', pessoaController.delete)

module.exports = router