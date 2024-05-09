const uuid = require('uuid');
const ObjectId = require('mongodb').ObjectId;
const mongodb = require('../database/mongodb');

module.exports.create = async (req, res) => {
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    try {
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

module.exports.findById = async (req, res) => {
    try {
        const db = await mongodb.getConnection();

        const userFound = await db.findOne({
            _id: new ObjectId(req.params.id)
        });

        return res.status(200).send({
            email: userFound.email,
            username: userFound.username
        });
    } catch (e) {
        return res.status(500).send(e);
    }
}

module.exports.update = async (req, res) => {
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    console.log(user);

    try {
        const db = await mongodb.getConnection();

        await db.updateOne({ _id: new ObjectId(req.params.id) }, { $set: user });

        return res.status(200).end();
    } catch (e) {
        return res.status(500).send(e);
    }
}