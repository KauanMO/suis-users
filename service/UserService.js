const ObjectId = require('mongodb').ObjectId;
const mongodb = require('../database/mongodb');


module.exports.create = async (user) => {
    const db = await mongodb.getConnection('users');

    const findByEmail = await db.find({
        '$or': [
            { email: user.email }, { username: user.username }
        ]
    }).toArray();

    if (findByEmail[0] !== undefined) {
        throw {
            message: "Conflito de e-mail",
            status: 409
        };
    }

    return await db.insertOne(user);
}

module.exports.findById = async (id) => {
    const db = await mongodb.getConnection('users');

    const userFound = await db.findOne({
        _id: new ObjectId(id)
    });

    if (userFound === null) {
        throw {
            message: "Usuário não encontrado",
            status: 404
        };
    }

    return userFound;
}

module.exports.update = async (user, id) => {
    const db = await mongodb.getConnection('users');

    await db.updateOne({ _id: new ObjectId(id) }, { $set: user });
}

module.exports.deleteById = async (id) => {
    const db = await mongodb.getConnection('users');

    await this.findById(id);
    
    await db.deleteOne({
        _id: new ObjectId(id)
    });
}