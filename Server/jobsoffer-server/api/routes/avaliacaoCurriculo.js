var express = require('express');
var router = express.Router();
const avaliacaoCurriculoController = require('../controllers/avaliacaoCurriculoController')

router.get('/:id', avaliacaoCurriculoController.getOne)

router.get('/', avaliacaoCurriculoController.getAll)

router.post('/', avaliacaoCurriculoController.insert)

router.put('/:id', avaliacaoCurriculoController.update)

router.delete('/:id', avaliacaoCurriculoController.delete)

module.exports = router