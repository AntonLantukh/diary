import {matchPath} from 'react-router';

import {routes, RouteConfig} from 'shared/routes';

export const getMatchedPage = (pathName: string): RouteConfig | undefined =>
    routes.find(route =>
        matchPath(pathName, {
            path: route.path,
            exact: true,
            strict: false,
        }),
    );
