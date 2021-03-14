import path from 'path';
import express from 'express';
import compression from 'compression';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import {UserRoutes} from './routes/User';
import {CommonRoutesConfig} from './routes/Common';

import ssrMiddleware from './middleware/ssr';
import errorMiddleware from './middleware/error';

import {routeLogger, errorLogger} from './logger';

const routes: Array<CommonRoutesConfig> = [];

dotenv.config();

const app = express();

app.use(routeLogger);
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(compression());
app.use(express.static(path.resolve(__dirname, '../dist/client')));
app.use(errorLogger);

routes.push(new UserRoutes(app));
app.get('*', [ssrMiddleware]);

app.use(errorMiddleware);

export default app;
