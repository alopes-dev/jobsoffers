var express = require('express');
var router = express.Router();
const detalheController = require('../controllers/detalheController')

router.get('/:id', detalheController.getOne)

router.get('/', detalheController.getAll)

router.post('/', detalheController.insert)

router.put('/:id', detalheController.update)

router.delete('/:id', detalheController.delete)

module.exports = router