import path from 'path';
import express from 'express';
import compression from 'compression';
import serverRenderMiddleware from './middleware';

const port = process.env.PORT || 9001;

const app = express();

app.use(compression())
    .use(express.static(path.resolve(__dirname, '../dist')))
    .use(express.static(path.resolve(__dirname, '../static')));

app.get('/*', serverRenderMiddleware);

app.listen(port, () => {
    console.log('Application is started on localhost:', port);
});
