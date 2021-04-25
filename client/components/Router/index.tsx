import React, {FunctionComponent} from 'react';
import {Switch, Route} from 'react-router-dom';

import {routes} from 'shared/routes';
import {useFindUser} from '˜/hooks/useFindUser';

import AccessChecker from '../AccessChecker';

const Router: FunctionComponent = () => {
    useFindUser();

    return (
        <main>
            <Switch>
                {routes.map(({Component, name, path, privateRoute}) => (
                    <Route key={name} path={path}>
                        <AccessChecker {...{privateRoute}}>
                            <Component />
                        </AccessChecker>
                    </Route>
                ))}
            </Switch>
        </main>
    );
};

export default Router;
