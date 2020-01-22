var express = require('express');
var router = express.Router();
const cidadeController = require('../controllers/cidadeController')

router.get('/:id', cidadeController.getOne)

router.get('/', cidadeController.getAll)

router.post('/', cidadeController.insert)

router.put('/:id', cidadeController.update)

router.delete('/:id', cidadeController.delete)

module.exports = router