const service = require('../service/UserService');

module.exports.create = async (req, res) => {
    try {
        const insertedUser = await service.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        return res.status(201).send({ id: insertedUser.insertedId });
    } catch (e) {
        return res.status(e.status).send(e);
    }
}

module.exports.findById = async (req, res) => {
    try {
        const userFound = await service.findById(req.params.id);

        return res.status(200).send({
            email: userFound.email,
            username: userFound.username
        });
    } catch (e) {
        return res.status(e.status).send(e);
    }
}

module.exports.update = async (req, res) => {
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    try {
        await service.update(user, req.params.id);

        return res.status(200).end();
    } catch (e) {
        return res.status(e.status).send(e);
    }
}

module.exports.deleteById = async (req, res) => {
    try {
        await service.deleteById(req.params.id);

        return res.status(204).end();
    } catch (e) {
        return res.status(e.status).send(e);
    }
}