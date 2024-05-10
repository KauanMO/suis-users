const service = require('../service/BadgeService');

module.exports.create = async (req, res) => {
    const badge = {
        bootcamp: req.body.bootcamp,
        date: req.body.date,
        icon: req.body.icon
    };

    try {
        const insertedBadge = await service.create(badge, req.params.user);

        return res.status(201).send({ id: insertedBadge.insertedId });
    } catch (e) {
        return res.status(e.status).send(e);
    }
}