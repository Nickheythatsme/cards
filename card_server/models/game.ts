import { MongoError } from "mongodb";
import { createLogger } from '../config'
import {db, createCollection} from '../db';
const logger = createLogger('gameModel');

createCollection('games', (err) => {
    if (err) {
        logger.warn('Could not create games collection: ' + err);
    }
});

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
     * @param name string
     * @param callback (err: MongoError, result: any)
     */
    public static getGame(name: string, callback: (err: MongoError, result: any) =>  void): void {
        db.collection('games').findOne({name: name}, callback);
    }
}
