const userController = require('../controller/UserController');

const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
    return userController.create(req, res);
});

router.get('/:id', (req, res) => {
    return userController.findById(req, res);
});

router.put('/:id', (req, res) => {
    return userController.update(req, res);
});

module.exports = router;