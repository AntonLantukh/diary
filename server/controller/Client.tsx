import React from 'react';
import path from 'path';
import {ParsedQs} from 'qs';
import serialize from 'serialize-javascript';
import {I18nextProvider} from 'react-i18next';
import {enableStaticRendering} from 'mobx-react-lite';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router';
import {Request, Response} from 'express';
import {ChunkExtractor} from '@loadable/server';

import {InitialDataFunction} from 'shared/routes';
import {getMatchedPage} from 'shared/utils/router';

import {I18nKeys} from 'shared/typings/i18n';

import Base from 'shared/components/Base';
import HtmlPage from '../components/HtmlPage';

import {setupI18Next} from '../i18n';

import CommonStore from 'shared/store/Common';
import I18nStore from 'shared/store/I18n';

type Context = {
    url?: string;
};

enableStaticRendering(true);

const loadInitialPageData = async (
    query: ParsedQs,
    getInitialData?: InitialDataFunction,
): Promise<Record<string, unknown>> => {
    if (!getInitialData) {
        return Promise.resolve({});
    }

    return getInitialData(query);
};

const getState = async (req: Request, locale: string, i18nKeys: I18nKeys) => {
    const {getInitialData, name, State} = getMatchedPage(req.path);

    const initialPageData = await loadInitialPageData(req.query, getInitialData);
    const common = new CommonStore({query: req.query, pathName: req.path, pageName: name});
    const i18n = new I18nStore({locale, i18nKeys});

    return new State({...initialPageData, i18n, common});
};

class ClientController {
    async generatePage(req: Request, res: Response): Promise<void> {
        const statsFile = path.resolve(__dirname, '../../dist/client/loadable-stats.json');
        const chunkExtractor = new ChunkExtractor({
            statsFile,
            publicPath: '/',
            entrypoints: ['main'],
        });
        const scripts = chunkExtractor.getScriptElements();
        const styles = chunkExtractor.getStyleElements();

        const locale = req.language;
        const i18nServer = await setupI18Next(locale);
        const i18nKeys = ({[locale]: i18nServer.getDataByLanguage(locale)} as unknown) as I18nKeys;
        const state = await getState(req, locale, i18nKeys);

        const context: Context = {};

        const JSX = chunkExtractor.collectChunks(
            <I18nextProvider i18n={i18nServer}>
                <Base {...{state}} />
            </I18nextProvider>,
        );

        const Html = (
            <HtmlPage scripts={scripts} styles={styles} initialState={serialize(state)}>
                <StaticRouter location={req.url} context={context}>
                    {JSX}
                </StaticRouter>
            </HtmlPage>
        );

        const reactHtml = renderToString(Html);

        if (context.url) {
            res.writeHead(301, {Location: context.url});
            res.end();
        } else {
            res.write(reactHtml);
            res.end();
        }
    }
}

export default new ClientController();
