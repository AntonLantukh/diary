import React, {FunctionComponent, useContext} from 'react';
import {Link} from 'react-router-dom';

import StateContext from 'shared/context/StateContext';

const Header: FunctionComponent = () => {
    const state = useContext(StateContext);

    return (
        <div>
            <Link to="/main">Main</Link>
            <Link to="/cabinet">Cabinet</Link>
        </div>
    );
};

export default Header;
