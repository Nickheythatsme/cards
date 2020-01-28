import { MongoError } from "mongodb";

const logger = require('./config').createLogger('db');
const MongoClient = require('mongodb').MongoClient;

const serverConfig = {
    // TODO: add support for a remote connection
    uri: 'mongodb://127.0.0.1:27017',
    dbName: process.env.dbName || 'test',
    options: {
        useUnifiedTopology: true
    }
}

// Create a new MongoClient
export const client = new MongoClient(serverConfig.uri, serverConfig.options);

// Use connect method to connect to the Server
client.connect( (err: MongoError) => {
    if (err) {
        logger.crit('Error connecting to the database: ', err)
        process.exit(1)
    }
    logger.info("Connected successfully to server");
});
export const db = client.db(serverConfig.dbName);
