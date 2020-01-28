import { Router } from 'express';
import { GameModel } from '../models';

export const router = Router();

router.get('/', (req, res) => {
    GameModel.getGames(req.query.offset, req.query.limit).then(games => {
        return res.json(games);
    })
    .catch(err => {
        res.statusCode = 500;
        console.log('error: ', err);
        return res.json(err)
    });
});

router.get('/update', (req, res) => {
    GameModel.getGames('0', '1').then(games => {
        games[0].name = 'new name!';
        GameModel.update(games[0])
            .then(game => {
                res.json(game);
            })
            .catch(err => {
                res.json(err);
            })
    }).catch(err => res.json(err));
})

router.get('/create', (req, res) => {
    GameModel.createGame(req.query.name)
        .then(game => res.json(game))
        .catch(err => res.json(err));
})

router.get('/delete', (req, res) => {
    GameModel.deleteGame(null)
        .then(res.send('deleted everything'))
        .catch((err: any) => res.json(err))
});