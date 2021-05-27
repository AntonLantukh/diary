import React, {FunctionComponent} from 'react';

import FormWrapper from '../FormWrapper';

import css from './style.css';

const Content: FunctionComponent = () => (
    <div className={css.content}>
        <FormWrapper />
    </div>
);

export default Content;
