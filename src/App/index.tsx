import {hot} from 'react-hot-loader/root';
import React, {useState} from 'react';

import css from './style.css';

const Application = ({name}: {name: string}): JSX.Element => {
    const [counter, updateCounter] = useState(0);

    return (
        <div className={css.container}>
            <span>{`Hello, ${name}!`}</span>
            <button onClick={() => updateCounter(counter + 5)}>Tap</button>
            <span>{counter}</span>
        </div>
    );
};

export enum Bool {
    True,
    False,
    FileNotFound,
}

export default Application;
