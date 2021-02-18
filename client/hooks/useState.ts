import {useContext} from 'react';

import StateContext from 'shared/context/StateContext';
import {StateInterface} from 'shared/typings/state';

export const useState = (): StateInterface => {
    const store: StateInterface = useContext(StateContext);

    return store;
};
