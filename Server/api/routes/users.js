var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
    /* GET all users listing. */
router.get('/', userController.getAll);

router.get('/:id', userController.getOne);

router.post('/', userController.insert);

router.delete('/:id', userController.delete)

router.put('/:id', userController.update)

module.exports = router;