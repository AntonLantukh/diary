import React from 'react';
import {hydrate, render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {hot} from 'react-hot-loader/root';
import {loadableReady} from '@loadable/component';
import {useSSR} from 'react-i18next';

import {getStateFromWindow} from '˜/utils/state';
import {registerServiceWorker} from '˜/utils/serviceWorker';
import {setupI18Next} from './i18n';

import Base from 'shared/components/Base';

const HotBase = hot(Base);

const root = document.querySelector('#root');
const state = getStateFromWindow();

registerServiceWorker();

const renderFunction: ReactDOM.Renderer = root?.hasChildNodes() ? hydrate : render;

const App = () => {
    useSSR(state.i18n.i18nKeys, state.i18n.locale);

    return (
        <BrowserRouter>
            <HotBase {...{state}} />
        </BrowserRouter>
    );
};

void loadableReady()
    .then(() => setupI18Next(state.i18n.locale))
    .then(() => renderFunction(<App />, root))
    .then(() => state.common.initialize());
