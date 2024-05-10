const ObjectId = require('mongodb').ObjectId;
const mongodb = require('../database/mongodb');
const UserService = require('./UserService');

module.exports.create = async (badge, user) => {
    await UserService.findById(user);

    const db = await mongodb.getConnection("badges");

    return await db.insertOne(
        {
            ...badge,
            user: new ObjectId(user)
        }
    );
}

module.exports.findById = async (id) => {
    const db = await mongodb.getConnection("badges");

    const badgeFound = await db.findOne({
        _id: new ObjectId(id)
    });

    if (badgeFound === null) {
        throw {
            message: "Badge não encontrada",
            status: 404
        };
    }

    return badgeFound;
}

module.exports.findByUser = async (user) => {
    const db = await mongodb.getConnection("badges");

    await UserService.findById(user);

    const badgesFound = await db.find({
        user: new ObjectId(user)
    }).toArray();

    return badgesFound;
}