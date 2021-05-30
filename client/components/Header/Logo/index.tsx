import React, {FunctionComponent} from 'react';
import {Link as RouteLink} from 'react-router-dom';

import Link from '@material-ui/core/Link';

import css from './style.css';
import logo from './logo.svg';

const Logo: FunctionComponent = () => (
    <Link to="/main" component={RouteLink}>
        <img src={logo} alt="logo" width="228" height="60" className={css.logo} />
    </Link>
);

export default Logo;
