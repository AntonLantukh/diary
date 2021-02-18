import React, {FunctionComponent} from 'react';
import {observer} from 'mobx-react-lite';
import {when} from 'mobx';

import {MainStateT} from 'shared/state/Main';
import {useState} from '˜/hooks/useState';

import {Input, PageHeader} from 'antd';

import css from './style.css';

const Main: FunctionComponent = observer(() => {
    const {account, common} = useState() as MainStateT;
    console.log(account, 'account');
    console.log(common, 'common');

    const dispose = when(
        () => common.isInitialized,
        () => console.log('Here we are!'),
    );

    dispose();

    return (
        <div className={css.container}>
            <PageHeader>{`Hello, ${account.getFullName}`}</PageHeader>
            <Input
                placeholder="Имя и фамилия"
                value={account.name}
                onChange={evt => account.editName(evt.target.value)}
            />
        </div>
    );
});

export default Main;
