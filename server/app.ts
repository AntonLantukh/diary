import path from 'path';
import express from 'express';
import compression from 'compression';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import localeRouter from './routes/Locale';
import userRouter from './routes/User';
import authRouter from './routes/Auth';

import ssrMiddleware from './middleware/ssr';
import errorMiddleware from './middleware/error';
import detectLocale from './middleware/locale';
import authMiddleware from './middleware/Auth';
import {handleAsync} from './middleware/async';

import {routeLogger, errorLogger} from './logger';

dotenv.config();

const app = express();

app.use(compression());
app.use(express.static(path.resolve(__dirname, '../dist/client')));

app.use(cookieParser());
app.use(detectLocale);
app.use(routeLogger);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(errorLogger);

app.use('/api/user', userRouter.configureRoutes());
app.use('/api/auth', authRouter.configureRoutes());
app.use('/api/locale', localeRouter.configureRoutes());

app.get('/cabinet', [handleAsync(authMiddleware.validateAccessToken), ssrMiddleware]);
app.get('/main', [ssrMiddleware]);

app.use(errorMiddleware);

export default app;
