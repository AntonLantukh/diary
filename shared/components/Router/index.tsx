import React, {FunctionComponent} from 'react';

import {getMatchedPage} from 'shared/utils/router';
import {useState} from '˜/hooks/useState';

import {BaseStateT} from 'shared/state/Base';

const Router: FunctionComponent = () => {
    const {common} = useState() as BaseStateT;

    const {Component} = getMatchedPage(common?.pageName || '') || {};

    return Component ? <Component /> : null;
};

export default Router;
