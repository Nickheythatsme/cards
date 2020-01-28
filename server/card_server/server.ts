import cors from 'cors';
import { createLogger, PORT } from './config';
import { router } from './controllers';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
const logger = createLogger('root');

export const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
    logger.info('Request', {
        ip: req.ip,
        url: req.url,
    });
    next();
});

app.use('/', router);

app.listen(3000, () => {
    console.log(`app listening on localhost:${PORT}`)
});
