const badgeController = require('../controller/BadgeController');

const express = require('express');

const router = express.Router();

router.post('/:user', (req, res) => {
    return badgeController.create(req, res);
});

router.get('/:id', (req, res) => {
    return badgeController.findById(req, res);
});

router.get('/user/:user', (req, res) => {
    return badgeController.findByUser(req, res);
});

module.exports = router;