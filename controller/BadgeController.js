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
        return res.status(e.status || 500).send(e);
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
        return res.status(e.status || 500).send(e);
    }
}

module.exports.findByUser = async (req, res) => {
    try {
        const badgesFound = await service.findByUser(req.params.user);

        if (badgesFound[0] === undefined) {
            return res.status(204).end();
        }

        return res.status(200).send(badgesFound)
    } catch (e) {
        return res.status(e.status || 500).send(e);
    }
}

module.exports.deleteById = async (req, res) => {
    try {
        await service.delete(req.params.id);

        return res.status(204).end();
    } catch (e) {
        return res.status(e.status || 500).send(e);
    }
}