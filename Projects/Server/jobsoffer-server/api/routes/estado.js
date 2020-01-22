var express = require('express');
var router = express.Router();
const estadoController = require('../controllers/estadoController')

router.get('/:id', estadoController.getOne)

router.get('/', estadoController.getAll)

router.post('/', estadoController.insert)

router.put('/:id', estadoController.update)

router.delete('/:id', estadoController.delete)

module.exports = router