const uuid = require('uuid');
const mongodb = require('../database/mongodb');

module.exports.create = async (req, res) => {
    try {
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };

        const db = await mongodb.getConnection();

        const findByEmail = await db.find({
            '$or': [
                { email: user.email }, { username: user.username }
            ]
        }).toArray();

        if (findByEmail[0] !== undefined) {
            return res.status(409).end();
        }

        const insertedUser = await db.insertOne(user);

        return res.status(201).send({ id: insertedUser.insertedId });
    } catch (e) {
        return res.status(500).send(e);
    }
}