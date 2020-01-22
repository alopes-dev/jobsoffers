var express = require('express');
var router = express.Router();
const contaUsuarioController = require('../controllers/contaUsuarioController')

router.get('/:id', contaUsuarioController.getOne)

router.get('/', contaUsuarioController.getAll)

router.post('/', contaUsuarioController.insert)

router.put('/:id', contaUsuarioController.update)

router.delete('/:id', contaUsuarioController.delete)

module.exports = router