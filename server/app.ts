import path from 'path';
import express from 'express';
import compression from 'compression';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import ssrMiddleware from './middleware/ssr';
import {routeLogger, errorLogger} from './logger';

dotenv.config();

const app = express();

app.use(routeLogger);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(compression());
app.use(express.static(path.resolve(__dirname, '../dist/client')));
app.use(errorLogger);

app.get('*', [ssrMiddleware]);

export default app;
