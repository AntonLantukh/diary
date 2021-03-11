import path from 'path';
import React from 'react';
import {ParsedQs} from 'qs';

import {enableStaticRendering} from 'mobx-react-lite';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router';
import {Request, Response} from 'express';
import {ChunkExtractor} from '@loadable/server';

import {InitialDataFunction} from 'shared/routes';
import {getMatchedPage} from 'shared/utils/router';

import Base from 'shared/components/Base';

type Context = {
    url?: string;
};

enableStaticRendering(true);

const loadInitialState = async (
    getInitialData: InitialDataFunction | undefined,
    pageName: string | undefined = '',
    pathName: string | undefined = '',
    query: ParsedQs,
): Promise<Record<string, unknown>> => {
    if (!getInitialData) {
        return Promise.resolve({});
    }

    return getInitialData(query, pathName, pageName);
};

const renderFullPage = (html: string, scripts: string, styles: string, state: string) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon"> 
            <title>Baby o diary</title>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            ${styles}
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            window.__INITIAL_STATE__ = ${state}
          </script>
          ${scripts}
        </body>
      </html>
    `;
};

export default async (req: Request, res: Response): Promise<void> => {
    const statsFile = path.resolve(__dirname, '../../dist/client/loadable-stats.json');
    const chunkExtractor = new ChunkExtractor({
        statsFile,
        publicPath: '/',
        entrypoints: ['main'],
    });
    const scripts = chunkExtractor.getScriptTags();
    const styles = chunkExtractor.getStyleTags();

    const context: Context = {};

    const {getInitialData, name, State} = getMatchedPage(req.path) || {};
    const initialState = await loadInitialState(getInitialData, name, req.path, req.query);
    const stringifiedState = JSON.stringify(initialState).replace(/</g, '\\u003c');
    const state = State ? new State(initialState) : {};

    const JSX = chunkExtractor.collectChunks(<Base {...{state}} />);

    const Html = (
        <StaticRouter location={req.url} context={context}>
            {JSX}
        </StaticRouter>
    );

    const reactHtml = renderToString(Html);

    if (context.url) {
        res.writeHead(301, {Location: context.url});
        res.end();
    } else {
        res.write(renderFullPage(reactHtml, scripts, styles, stringifiedState));
        res.end();
    }
};
