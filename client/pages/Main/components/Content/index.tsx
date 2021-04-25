import React, {FunctionComponent} from 'react';

import Promo from '../Promo';

import css from './style.css';

const Content: FunctionComponent = () => (
    <div className={css.content}>
        <Promo />
    </div>
);

export default Content;
