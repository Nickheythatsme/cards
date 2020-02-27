import * as jwt from 'jsonwebtoken';
import config from './config';
import {Nullable} from './types';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import {logError} from './utils';

export interface ReqWithUser extends Request {
    user: object;
}


export default class JWTAuth {
    constructor() {

    }

    public static sign(payload: object, callback: (err: any, token: string) => void): void {
        jwt.sign(payload, config.privateKey, {}, callback);
    }

    public static verify(token: string, callback: (err: Nullable<string>, decoded: Nullable<object>) => any): void {
        try {
            let decoded: string|object = jwt.verify(token, config.privateKey);
            callback(null, <object>decoded);
        } catch(err) {
            callback(err, null);
        }
    }

    public static authRequired(req: Request, res: Response, next: NextFunction): any {
        let clientApiKey = req.get('api_key');
        console.log('authRequired');
        if (!clientApiKey) {
            logError('Missing API key', __filename);
            return res.status(400).send({
                status: false,
                response: 'Missing API key',
            });
        }
        this.verify(clientApiKey, (err, decoded) => {
            if (err) {
                logError(`Invalid API key (${err})`);
                return res.status(401).send({
                    status: false,
                    response: 'Invalid API key',
                });
            }
            (req as ReqWithUser).user = <object>decoded;
            res.status(200).json({cool: true})
            next();
        });
        res.status(200).json({cool: true})
    }
}
