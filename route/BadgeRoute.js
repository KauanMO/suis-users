const badgeController = require('../controller/BadgeController');

const express = require('express');

const router = express.Router();

router.post('/:user', (req, res) => {
    return badgeController.create(req, res);
});

router.get('/:id', (req, res) => {
    return badgeController.findById(req, res);
});

module.exports = router;