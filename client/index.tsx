import React from 'react';
import {hydrate, render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {hot} from 'react-hot-loader/root';
import {loadableReady} from '@loadable/component';

import {getStateFromWindow} from '˜/utils/state';

import Base from 'shared/components/Base';

const HotBase = hot(Base);

const root = document.querySelector('#root');
const state = getStateFromWindow();

const renderFunction: ReactDOM.Renderer = root?.hasChildNodes() ? hydrate : render;

void loadableReady(() => {
    renderFunction(
        <BrowserRouter>
            <HotBase {...{state}} />
        </BrowserRouter>,
        root,
    );
});
