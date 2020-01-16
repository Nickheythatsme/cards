const db = require('./db').db;
const {gameModel } = require('./models/index')

gameModel.createGame('test game!', {}, (err, result) => {
    console.log('error: ', err);
    console.log('result: ', result.ops);
});

var server;

module.exports = server;