import {ParsedQs} from 'qs';
import {FunctionComponent} from 'react';

import Main from '˜/pages/Main';
import Cabinet from '˜/pages/Cabinet';
import NotFound from '˜/pages/NotFound';
import Login from 'client/pages/Auth';

import MainState from 'shared/state/Main';
import CabinetState from 'shared/state/Cabinet';
import BaseState from 'shared/state/Base';

import getInititalMainState from 'server/initialState/Main';
import getInitialCabinetState from 'server/initialState/Cabinet';

import {BaseState as BaseStateT} from 'shared/typings/state';

export type InitialDataFunction = (query: ParsedQs) => Promise<Record<string | never, unknown>>;

interface Constructable<T> {
    new (args: any): T;
}

export type RouteConfig = {
    name: string;
    path: string;
    Component: FunctionComponent<Record<string, unknown>>;
    State: Constructable<BaseStateT>;
    getInitialData?: InitialDataFunction;
    privateRoute: boolean;
};

export const routes: RouteConfig[] = [
    {
        name: 'Cabinet',
        path: '/cabinet',
        Component: Cabinet,
        getInitialData: getInitialCabinetState,
        State: CabinetState,
        privateRoute: true,
    },
    {
        name: 'Main',
        path: '/main',
        Component: Main,
        getInitialData: getInititalMainState,
        State: MainState,
        privateRoute: false,
    },
    {
        name: 'Auth',
        path: '/auth',
        Component: Login,
        State: BaseState,
        privateRoute: false,
    },
    {
        name: 'NotFound',
        path: '*',
        Component: NotFound,
        State: BaseState,
        privateRoute: false,
    },
];
