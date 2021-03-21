import {routes, RouteConfig} from 'shared/routes';

import {BaseState, BaseMobxState} from 'shared/typings/state';

export const getStateFromWindow = (): BaseMobxState => {
    const windowState = window.__INITIAL_STATE__ as BaseState;
    const initialState = typeof windowState === 'string' ? (JSON.parse(windowState) as BaseState) : windowState;

    const {State} = routes.find(route => route.name === initialState.common.pageName) as RouteConfig;

    return new State(initialState) as BaseMobxState;
};
