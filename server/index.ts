import https from 'https';
import fs from 'fs';

import 'dotenv/config';

import app from './app';
import {logger} from './logger';

const port = process.env.PORT || 9000;
const httpsOptions = {
    key: fs.readFileSync('./certificates/localhost-key.pem'),
    cert: fs.readFileSync('./certificates/localhost.pem'),
};

https.createServer(httpsOptions, app).listen(port, () => {
    logger.info(`App is running on https://localhost:${port}`);
});
