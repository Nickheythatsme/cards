import express, {Express} from 'express';
import config, {AppConfigType} from './config';
import cors from 'cors';
import JWTAuth from './session';

const app: Express & {config: AppConfigType} = Object.assign({}, express(), {config: config});
app.use(cors());

app.get('/', (req, res) => {
    res.send('test');
});

JWTAuth.sign({message: 'test'}, (err, token) => {
    console.log('token: ', token);
    JWTAuth.verify(token, (err, decoded) => {
        console.log('decoded: ', decoded);
    });
});


export default app;