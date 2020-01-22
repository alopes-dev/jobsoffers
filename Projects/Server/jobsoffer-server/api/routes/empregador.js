var express = require('express');
var router = express.Router();
const empregadorController = require('../controllers/empregadorController')

router.get('/:id', empregadorController.getOne)

router.get('/', empregadorController.getAll)

router.post('/', empregadorController.insert)

router.put('/:id', empregadorController.update)

router.delete('/:id', empregadorController.delete)

module.exports = router