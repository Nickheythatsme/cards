import { MongoError } from "mongodb";
import { createLogger } from '../config'
import { db } from '../db';
const logger = createLogger('gameModel');

db.createCollection('games').catch((err: MongoError) => console.log('err: ', err));

export default class Game {
    private _id: any;
    private name: string;

    constructor(opts: {name: string, _id: any}) {
        this._id = opts._id;
        this.name = opts.name;
    }

    public setName(newName: string): Promise<Game> {
        return new Promise((resolve, reject) => {
            this.name = newName;
            db.collection('games').updateOne({_id: this._id}, {$set: {name: this.name}}, (err: MongoError) => {
                if (err) {
                    reject(err);
                } else {
                    logger.info('updated game name to: ' + newName);
                    resolve(this);
                }
            });
        });
    }

    /**
     * Create a new game
     * @param {string} name 
     * @param {*} opts 
     */
    public static createGame(name: string, opts?: any): Promise<any> {
        let obj: any = {};
        for (let key in opts) {
            obj[key] = opts[key];
        }
        obj.name = name;
        return new Promise((resolve, reject) => {
            db.collection('games').insertOne(obj, (err: MongoError, result: Game) => {
                if (err) {
                    reject(err);
                }
                resolve(new Game({name, _id: result._id}));
            });
        });
    }

    /**
     * 
     * @param name string
     * @param callback (err: MongoError, result: any)
     */
    public static getGame(name: string): Promise<Game> {
        return new Promise((resolve, reject) => {
            db.collection('games').findOne({name: name}, (err: MongoError, result: any) => {
                if (err) {
                    reject(err);
                }
                resolve(new Game(result));
            });
        });
    }
}
