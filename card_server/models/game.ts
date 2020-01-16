import { MongoError } from "mongodb";

const logger = require('../config').createLogger('GameModel');
const { db, createCollection } = require('../db');

createCollection('games');

export default class Game {
    constructor() {

    }

    /**
     * Create a new game
     * @param {string} name 
     * @param {*} opts 
     */
    public static createGame(name: string, opts: any, callback: (err: MongoError, result: any) => void): void{
        db.collection('games').insertOne({
            name: name,
            opts: opts
        }, (err: MongoError, result: any) => {
            if (err) {
                logger.warn('Could not add game: ' + err, {err: err});
            } else {
                logger.info('Successfully added game');
            }
            callback(err, result);
        });
    }

    /**
     * 
     * @param {*} name 
     * @param {*} callback 
     */
    public static getGame(name: string, callback: (err: MongoError, result: any) =>  void): void {
        db.collection('games').findOne({name: name}, (err: MongoError, result: any) => {
            if (err) {
                logger.warn('Error finding game: ', err, {err: err});
            } else {
                logger.info('Found game: ', result.name);
            }
            callback(err, result);
        });
    }
}
