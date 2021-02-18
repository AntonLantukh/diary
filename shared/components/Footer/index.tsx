import React, {FunctionComponent, useContext} from 'react';

import StateContext from 'shared/context/StateContext';

const Footer: FunctionComponent = () => {
    const state = useContext(StateContext);

    return <div>That is footer</div>;
};

export default Footer;
