import React, {FunctionComponent, useState} from 'react';
import {observer} from 'mobx-react-lite';

import css from './style.css';

const Cabinet: FunctionComponent = observer(() => {
    const [isOn, changeValue] = useState(false);

    return (
        <div className={css.container}>
            <div className={css.wrapper}>
                <input type="checkbox" checked={isOn} readOnly />
                <button onClick={() => changeValue(!isOn)}>Change value!</button>
            </div>
        </div>
    );
});

export default Cabinet;
