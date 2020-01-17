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

gameModel.createGame('new game!', {created: Date.now()});

gameModel.getGame('new game!').then(game => {
    game.setName('nicky!');
}).catch(err => {
    logger.warn('Error getting game', {err: err});
})
