import React, {FunctionComponent, useState, useCallback} from 'react';
import {useTranslation} from 'react-i18next';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import type {MenuEnum} from '../../typings';

import css from './style.css';

const TYPE = {
    LIST: 'LIST',

    CREATE: 'CREATE',
};

type Props = {
    selectedMode: MenuEnum;
    onChange: (_: React.ChangeEvent<unknown>, el: MenuEnum) => void;
};

const Menu: FunctionComponent<Props> = ({selectedMode, onChange}) => {
    const {t} = useTranslation();

    return (
        <Tabs
            className={css.menu}
            value={selectedMode}
            orientation="vertical"
            indicatorColor="primary"
            textColor="primary"
            onChange={onChange}
        >
            <Tab label={t('cabinet:menu.list')} value={TYPE.LIST} id={TYPE.LIST} />
            <Tab label={t('cabinet:menu.create')} value={TYPE.CREATE} id={TYPE.CREATE} />
        </Tabs>
    );
};

export default Menu;
