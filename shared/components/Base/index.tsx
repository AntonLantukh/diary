import React, {FunctionComponent} from 'react';
import {configure} from 'mobx';

import StateContext from 'shared/context/StateContext';

import Grid from '@material-ui/core/Grid';

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

const Base: FunctionComponent<Props> = ({state}) => {
    return (
        <StateContext.Provider value={state}>
            <Grid container spacing={3} direction="column" justify="center" alignItems="center">
                <Grid item>
                    <Header />
                </Grid>
                <Grid item>
                    <Router />
                </Grid>
                <Grid item>
                    <Footer />
                </Grid>
            </Grid>
        </StateContext.Provider>
    );
};

export default Base;
