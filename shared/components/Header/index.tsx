import React, {FunctionComponent, useContext, useCallback, ChangeEvent, useState} from 'react';
import {Link as RouteLink} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';
import Cookie from 'js-cookie';
import {getLocale} from 'shared/resolvers/locale';

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import StateContext from 'shared/context/StateContext';
import {BaseMobxState} from 'shared/typings/state';

import {COMMON_NAMESPACES} from 'shared/constants/i18n';

const Header: FunctionComponent = observer(() => {
    const {
        common: {keysetName},
    } = useContext(StateContext) as BaseMobxState;
    const {t, i18n} = useTranslation();
    const [locale, changeLocale] = useState(i18n.language);

    const onChange = useCallback(
        async (evt: ChangeEvent<{name?: string | undefined; value: unknown}>) => {
            const value = evt.target.value as string;

            if (!i18n.hasResourceBundle(value, keysetName)) {
                const keys = await getLocale({locale: value, page: keysetName});
                i18n.addResourceBundle(value, keysetName, keys, true);
                COMMON_NAMESPACES.forEach(set => i18n.addResourceBundle(value, set, keys, true));
            }
            await i18n.changeLanguage(value);
            changeLocale(value);
            Cookie.set('locale', value);
        },
        [changeLocale, i18n, keysetName],
    );

    return (
        <Grid container spacing={8} direction="row" justify="center" alignItems="center">
            <Grid item>
                <Link to="/main" component={RouteLink}>
                    {t('header:menu.main')}
                </Link>
            </Grid>
            <Grid item>
                <Link to="/cabinet" component={RouteLink}>
                    {t('header:menu.cabinet')}
                </Link>
            </Grid>
            <Grid item>
                <FormControl variant="outlined">
                    <Select
                        id="locale-select"
                        native
                        value={locale}
                        onChange={onChange}
                        label={t('header:locale.label')}
                    >
                        <option value="en">{t('header:locale.en')}</option>
                        <option value="ru">{t('header:locale.ru')}</option>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
});

export default Header;
