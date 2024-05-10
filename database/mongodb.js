const MongoClient = require('mongodb').MongoClient;

module.exports.getConnection = async (collection) => {
    const client = await MongoClient.connect(process.env.DATABASE_URL);
    const con = client.db().collection(collection);

    return con;
}