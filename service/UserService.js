const ObjectId = require('mongodb').ObjectId;
const mongodb = require('../database/mongodb');

const errors = require('../utils/errors');

module.exports.create = async (user) => {
    checkUserInfo(user);

    const db = await mongodb.getConnection('users');

    const findByEmail = await db.find({
        email: user.email
    }).toArray();

    const findByUsername = await db.find({
        username: user.username
    }).toArray();

    if (findByEmail[0] !== undefined) {
        throw errors.conflict('Conflito de email');
    }

    if (findByUsername[0] !== undefined) {
        throw errors.conflict('Conflito de nome de usuário');
    }

    return await db.insertOne(user);
}

const checkUserInfo = user => {
    if (user.username.length < 4) throw errors.badRequest('Insira um nome de usuário válido');

    if (!checkEmail(user.email)) throw errors.badRequest('Insira um email válido');

    if (!checkPassword(user.password)) throw errors.badRequest('Insira uma senha válida');
}

const checkEmail = email => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

const checkPassword = password => {
    return String(password)
        .match(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        )
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