var express = require('express');
var router = express.Router();
const cargoController = require('../controllers/cargoController')

router.get('/:id', cargoController.getOne)

router.get('/', cargoController.getAll)

router.post('/', cargoController.insert)

router.put('/:id', cargoController.update)

router.delete('/:id', cargoController.delete)

module.exports = router