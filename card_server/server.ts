import { gameModel } from './models';
import { createLogger } from './config';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';

export const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const logger = createLogger('root');

gameModel.createGame('new game!', {created: Date.now()}, (err, result) => {
    if (err) {
        logger.warning('Could not add game: ' + err);
    } else {
        logger.info('Added new game!', {ops: result.ops[0]});
    }
})