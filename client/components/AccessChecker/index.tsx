import React, {FunctionComponent, ReactElement} from 'react';
import {Redirect} from 'react-router-dom';

import accessTokenManager from '../../auth/token';

type Props = {
    privateRoute: boolean;
    children: ReactElement;
};

const AccessChecker: FunctionComponent<Props> = ({children, privateRoute = false}: Props) => {
    if (!privateRoute) {
        return children;
    }

    const token = accessTokenManager.getDecodedToken();

    console.log(token, 'token');
    console.log(accessTokenManager.getAccessToken(), 'token1');

    return token ? children : <Redirect to={{pathname: '/main', state: {from: location}}} />;
};

export default AccessChecker;
