const logger = require('../config').createLogger('GameModel');
const { db, createCollection } = require('../db');


createCollection('games');

class Game {
    /**
     * Create a new game
     * @param {string} name 
     * @param {*} opts 
     */
    static createGame(name, opts, callback) {
        db.collection('games').insertOne({
            name: name,
            opts: opts
        }, (err, result) => {
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
    static getGame(name, callback) {
        db.collection('games').findOne({name: name}, (err, result) => {
            if (err) {
                logger.warn('Error finding game: ', err, {err: err});
            } else {
                logger.info('Found game: ', result.name);
            }
            callback(err, result);
        });
    }
}

module.exports = Game;