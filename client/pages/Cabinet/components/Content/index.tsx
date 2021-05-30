import React, {FunctionComponent, useState, useCallback} from 'react';

import {MENU} from '../../constants';
import type {MenuEnum} from '../../typings';

import Menu from '../Menu';
import Diary from '../Diary';

import css from './style.css';

const Content: FunctionComponent = () => {
    const [selectedMode, changeMode] = useState<MenuEnum>(MENU.CREATE);
    const onChange = useCallback(
        (_, newType: keyof typeof MENU) => {
            changeMode(newType);
        },
        [changeMode],
    );

    return (
        <div className={css.cabinet}>
            <Menu {...{selectedMode, onChange}} />
            <Diary {...{selectedMode}} />
        </div>
    );
};

export default Content;
