import React, {FunctionComponent, useContext, useCallback, ChangeEvent, useState} from 'react';
import {Link as RouteLink} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';
import Cookie from 'js-cookie';
import localeService from 'client/service/locale';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';

import StateContext from 'shared/context/StateContext';
import {BaseMobxState} from 'shared/typings/state';

import authService from 'client/service/auth';

import {COMMON_NAMESPACES} from 'shared/constants/i18n';

import css from './style.css';
import logo from './logo.svg';

const Header: FunctionComponent = observer(() => {
    const {
        common: {keysetName},
    } = useContext(StateContext) as BaseMobxState;
    const {t, i18n} = useTranslation();
    const [locale, changeLocale] = useState(i18n.language);
    const [isWhiteTheme, changeTheme] = useState(true);

    const onChange = useCallback(
        async (evt: ChangeEvent<{name?: string | undefined; value: unknown}>) => {
            const value = evt.target.value as string;

            if (!i18n.hasResourceBundle(value, keysetName)) {
                const keys = await localeService.getLocale({locale: value, page: keysetName});
                i18n.addResourceBundle(value, keysetName, keys, true);
                COMMON_NAMESPACES.forEach(set => i18n.addResourceBundle(value, set, keys, true));
            }
            await i18n.changeLanguage(value);
            changeLocale(value);
            Cookie.set('locale', value);
        },
        [changeLocale, i18n, keysetName],
    );

    const onSignOut = useCallback(async () => {
        await authService.signOut();
    }, []);

    return (
        <header className={css.root}>
            <div className={css.container}>
                <Link to="/main" component={RouteLink}>
                    <img src={logo} alt="logo" width="228" height="60" className={css.logo} />
                </Link>
                <FormControl className={css.language}>
                    <InputLabel htmlFor="locale-select">{t('header:locale.label')}</InputLabel>
                    <Select id="locale-select" value={locale} onChange={onChange}>
                        <option value="en">{t('header:locale.en')}</option>
                        <option value="ru">{t('header:locale.ru')}</option>
                    </Select>
                </FormControl>
                <FormControlLabel
                    control={<Switch checked={isWhiteTheme} onChange={changeTheme} name="theme" color="primary" />}
                    label="Сменить тему"
                />
                <div className={css.user}>
                    <Link to="/cabinet" component={RouteLink}>
                        <Avatar>OP</Avatar>
                    </Link>
                    <Typography variant="body2">
                        <Link onClick={onSignOut}>Sign out</Link>
                    </Typography>
                </div>
            </div>
        </header>
    );
});

export default Header;
