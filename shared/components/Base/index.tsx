import React, {FunctionComponent} from 'react';
import {configure} from 'mobx';

import StateContext from 'shared/context/StateContext';

import Header from '../Header';
import Footer from '../Footer';
import Router from '../Router';

configure({
    enforceActions: 'always',
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: false,
    disableErrorBoundaries: false,
});

type Props = {
    state: Record<string, unknown>;
};

const Base: FunctionComponent<Props> = ({state}) => (
    <StateContext.Provider value={state}>
        <Header />
        <Router />
        <Footer />
    </StateContext.Provider>
);

export default Base;
