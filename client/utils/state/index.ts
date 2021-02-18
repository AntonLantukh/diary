import {routes, RouteConfig} from 'shared/routes';

import {StateInterface} from 'shared/typings/state';
import {Common} from 'shared/typings/common';

export const getStateFromWindow = (): StateInterface => {
    const windowState = window.__INITIAL_STATE__;
    const initialState = typeof windowState === 'string' ? (JSON.parse(windowState) as {common: Common}) : windowState;

    const {State} = routes.find(route => route.name === initialState?.common?.pageName) as RouteConfig;

    return new State(initialState);
};
