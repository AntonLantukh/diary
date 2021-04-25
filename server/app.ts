import path from 'path';
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import localeRouter from './routes/Locale';
import userRouter from './routes/User';
import authRouter from './routes/Auth';
import clientRouter from './routes/Client';

import errorMiddleware from './middleware/error';
import detectLocale from './middleware/locale';
import attachCspNonce from './middleware/nonce';

import {routeLogger, errorLogger} from './logger';

const app = express();

app.use(attachCspNonce);
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                ...helmet.contentSecurityPolicy.getDefaultDirectives(),
                // @ts-expect-error
                'script-src': ["'self'", (req: Request) => `'nonce-${req.cspNonce}'`],
                'connect-src': [__IS_PRODUCTION__ ? "'self'" : '*'],
            },
        },
    }),
);
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
app.use('/', clientRouter.configureRoutes());

app.use(errorMiddleware);

export default app;
