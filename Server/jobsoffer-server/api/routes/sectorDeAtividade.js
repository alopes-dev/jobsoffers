var express = require('express');
var router = express.Router();
const sectorDeAtividadeController = require('../controllers/sectorDeAtividadeController')

router.get('/:id', sectorDeAtividadeController.getOne)

router.get('/', sectorDeAtividadeController.getAll)

router.post('/', sectorDeAtividadeController.insert)

router.put('/:id', sectorDeAtividadeController.update)

router.delete('/:id', sectorDeAtividadeController.delete)

module.exports = router