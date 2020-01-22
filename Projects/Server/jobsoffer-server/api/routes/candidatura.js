var express = require('express');
var router = express.Router();
const candidaturaController = require('../controllers/candidaturaController')

router.get('/:id', candidaturaController.getOne)

router.get('/', candidaturaController.getAll)

router.post('/', candidaturaController.insert)

router.put('/:id', candidaturaController.update)

router.delete('/:id', candidaturaController.delete)

module.exports = router