import React, {FunctionComponent, ReactElement} from 'react';
import {Redirect} from 'react-router-dom';

type Props = {
    privateRoute: boolean;
    children: ReactElement;
};

const AccessChecker: FunctionComponent<Props> = ({children, privateRoute = false}: Props) => {
    if (!privateRoute) {
        return children;
    }

    return children || <Redirect to={{pathname: '/main', state: {from: location}}} />;
};

export default AccessChecker;
