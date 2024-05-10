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

