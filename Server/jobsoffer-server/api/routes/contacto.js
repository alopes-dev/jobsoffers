var express = require('express');
var router = express.Router();
const contactoController = require('../controllers/contactoController')

router.get('/:id', contactoController.getOne)

router.get('/', contactoController.getAll)

router.post('/', contactoController.insert)

router.put('/:id', contactoController.update)

router.delete('/:id', contactoController.delete)

module.exports = router