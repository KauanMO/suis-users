const userController = require('../controller/UserController');

const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
    return userController.create(req, res);
});

module.exports = router;