var express = require('express');
var router = express.Router();
const oportunidadeController = require('../controllers/oportunidadeController')

router.get('/:id', oportunidadeController.getOne)

router.get('/', oportunidadeController.getAll)

router.post('/', oportunidadeController.insert)

router.put('/:id', oportunidadeController.update)

router.delete('/:id', oportunidadeController.delete)

module.exports = router