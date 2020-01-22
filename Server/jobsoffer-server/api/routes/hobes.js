var express = require('express');
var router = express.Router();
const hobesController = require('../controllers/hobesController')

router.get('/:id', hobesController.getOne)

router.get('/', hobesController.getAll)

router.post('/', hobesController.insert)

router.put('/:id', hobesController.update)

router.delete('/:id', hobesController.delete)

module.exports = router