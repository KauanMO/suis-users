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

module.exports.findById = async (req, res) => {
    try {
        const badgeFound = await service.findById(req.params.id);

        return res.status(200).send({
            bootcamp: badgeFound.bootcamp,
            user: badgeFound.user,
            date: badgeFound.date,
            icon: badgeFound.icon,
        })
    } catch (e) {
        return res.status(e.status).send(e);
    }
}