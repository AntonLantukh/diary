import React, {FunctionComponent} from 'react';
import {Switch, Route} from 'react-router-dom';

import {routes} from 'shared/routes';

const Router: FunctionComponent = () => (
    <Switch>
        {routes.map(({Component, name, path}) => (
            <Route key={name} path={path}>
                <Component />
            </Route>
        ))}
    </Switch>
);

export default Router;
