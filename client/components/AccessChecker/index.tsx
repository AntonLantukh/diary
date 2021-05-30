import React, {useContext, FunctionComponent, ReactElement} from 'react';
import {Redirect, useLocation} from 'react-router-dom';

import StateContext from 'shared/context/StateContext';
import {BaseMobxState} from 'shared/typings/state';

type Props = {
    privateRoute: boolean;
    children: ReactElement;
};

const AccessChecker: FunctionComponent<Props> = ({children, privateRoute = false}: Props) => {
    const location = useLocation();
    const {user} = useContext(StateContext) as BaseMobxState;
    
    console.log(user, 'user');

    if (!privateRoute) {
        return children;
    }

    return user ? children : <Redirect to={{pathname: '/main', state: {from: location}}} />;
};

export default AccessChecker;
