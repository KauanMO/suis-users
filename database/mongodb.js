const MongoClient = require('mongodb').MongoClient;

module.exports.getConnection = async () => {
    const client = await MongoClient.connect(process.env.DATABASE_URL);
    const collection = client.db().collection("users");

    return collection;
}