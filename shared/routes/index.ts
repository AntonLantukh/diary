import {ParsedQs} from 'qs';
import {FunctionComponent} from 'react';

import Main from '˜/pages/Main';
import Cabinet from '˜/pages/Cabinet';

import MainState from 'shared/state/Main';
import CabinetState from 'shared/state/Cabinet';

import getInititalMainState from 'server/initialState/Main';
import getInitialCabinetState from 'server/initialState/Cabinet';

import {BaseState} from 'shared/typings/state';

export type InitialDataFunction = (query: ParsedQs) => Promise<Record<string, unknown>>;

interface Constructable<T> {
    new (args: any): T;
}

export type RouteConfig = {
    name: string;
    path: string;
    Component: FunctionComponent<Record<string, unknown>>;
    State: Constructable<BaseState>;
    getInitialData: InitialDataFunction;
};

export const routes: RouteConfig[] = [
    {
        name: 'Cabinet',
        path: '/cabinet',
        Component: Cabinet,
        getInitialData: getInitialCabinetState,
        State: CabinetState,
    },
    {
        name: 'Main',
        path: '/',
        Component: Main,
        getInitialData: getInititalMainState,
        State: MainState,
    },
    {
        name: 'NotFound',
        path: '*',
        Component: Main,
        getInitialData: getInititalMainState,
        State: CabinetState,
    },
];
