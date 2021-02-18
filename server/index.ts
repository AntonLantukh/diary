import path from 'path';
import express from 'express';
import compression from 'compression';
import dotenv from 'dotenv';

import ssrMiddleware from './middleware/ssr';

dotenv.config();

const port = process.env.PORT || 9000;
const app = express();

app.use(compression());
app.use(express.static(path.resolve(__dirname, '../dist/client')));

app.get('*', ssrMiddleware);

app.listen(port, () => {
    console.log('Application is started on localhost:', port);
});
