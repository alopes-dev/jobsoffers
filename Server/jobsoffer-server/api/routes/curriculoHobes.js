var express = require('express');
var router = express.Router();
const curriculoHobesController = require('../controllers/curriculoHobesController')

router.get('/:id', curriculoHobesController.getOne)

router.get('/', curriculoHobesController.getAll)

router.post('/', curriculoHobesController.insert)

router.put('/:id', curriculoHobesController.update)

router.delete('/:id', curriculoHobesController.delete)

module.exports = router