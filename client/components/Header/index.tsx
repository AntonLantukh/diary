import React, {FunctionComponent} from 'react';
import {observer} from 'mobx-react-lite';

import css from './style.css';

import Auth from './Auth';
import Logo from './Logo';
import Locale from './Locale';

const Header: FunctionComponent = observer(() => {
    return (
        <header className={css.header}>
            <div className={css.header__container}>
                <Logo />
                <Locale />
                <Auth />
            </div>
        </header>
    );
});

export default Header;
