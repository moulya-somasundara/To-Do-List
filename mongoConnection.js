
const MongoClient = require("mongodb").MongoClient;

const settings = {
    mongoConfig: {
        serverURL: "mongodb://localhost:27017/",
        database: "lab4"
    }
};

let full_mongodbURL = settings.mongoConfig.serverURL + settings.mongoConfig.database;
let _connection = undefined;

let connectDB = () => {
    if(!_connection) {
        _connection = MongoClient.connect(full_mongodbURL).then((db) => {
            return db;
        });
    }
    return _connection;
};

module.exports = connectDB;