import { MongoError, Timestamp, ObjectId } from "mongodb";
import { db } from '../db';

db.createCollection('games').catch((err: MongoError) => console.log('err: ', err));

export interface GameInterface {
    _id: ObjectId;
    name: string;
    created?: Date;
    lastModified?: Date;
    active?: boolean;
    cards?: [any];
    lastMove?: Timestamp;
}

export class GameModel {

    /**
     * 
     * @param game the game to update
     */
    public static update(game: GameInterface): Promise<GameInterface> {
        game.lastModified = new Date();
        return new Promise((resolve, reject) => {
            db.collection('games')
                .updateOne(
                    { _id: game._id }, 
                    {
                        $set: {
                            ...game
                        }
                    }).then((result: any) => {
                        resolve(game);
                    }).catch((err: any) => reject(err));
        });
    }

    /**
     * Create a new game
     * @param {string} name 
     */
    public static createGame(name: string): Promise<GameInterface> {
        let obj: GameInterface = {
            _id: new ObjectId(),
            name: name,
            created: new Date(),
            lastModified: new Date(),
            active: true
        };
        return new Promise((resolve, reject) => {
            db.collection('games').insertOne(obj)
                .then((result: any) => {
                    resolve(Object.assign({}, obj, { _id: result.insertedId }));
                })
                .catch((err: MongoError) => reject(err))
            }
        );
    }

    /**
     * 
     * @param name 
     */
    public static getGame(name: string): Promise<GameInterface> {
        return new Promise((resolve, reject) => {
            db.collection('games').findOne({name: name}, (err: MongoError, result: GameInterface) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    /**
     * 
     * @param offset 
     * @param limit 
     */
    public static getGames(offset?: string, limit?: string): Promise<[GameInterface]> {
        return new Promise((resolve, reject) => {
            db.collection('games').find({})
                .skip(Number.parseInt(offset || '0'))
                .limit(Number.parseInt(limit || '10'))
                .toArray()
                .then((result: [GameInterface]) => resolve(result))
                .catch((err: any) => reject(err));
        });
    }

    public static deleteGame(game: GameInterface): Promise<null> {
        return new Promise((resolve, reject) => {
            db.collection('games').deleteMany({})
                .then(resolve())
                .catch((err: any) => reject(err));
        });
    }
}
