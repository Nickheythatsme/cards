import { MongoError } from "mongodb";

const logger = require('./config').createLogger('db');
const MongoClient = require('mongodb').MongoClient;


const buildMongoUri = () => {
    const user = encodeURIComponent(process.env.mongoUser || 'root');
    const password =  encodeURIComponent(process.env.mongoPassword || 'password');
    const host =  process.env.host || '127.0.0.1';
    const port = process.env.port || 27017;
    return `mongodb://${user}:${password}@${host}:${port}/admin?authSource=admin`;
}

const serverConfig = {
    uri: buildMongoUri(),
    dbName: process.env.dbName || 'test',
    options: {
        useUnifiedTopology: true
    }
}

// Create a new MongoClient
const client = new MongoClient(serverConfig.uri, serverConfig.options);

// Use connect method to connect to the Server
client.connect( (err: MongoError) => {
    if (err) {
        logger.crit('Error connecting to the database: ', err)
        process.exit(1)
    }
    logger.info("Connected successfully to server");
});
const db = client.db(serverConfig.dbName);

/**
 * 
 * @param {string} name 
 * @param {function(*, *): void} callback
 */
function createCollection(name: string, callback: (err: MongoError, result: any) => void) {
    logger.info('Creating collection: ' + name);
    db.createCollection(name, callback || ((err: MongoError, result: any) => {
        if (err) {
            logger.warning('Error creating collection: ' + err);
        }
    }));
}

module.exports = {
    client,
    db,
    createCollection
};
