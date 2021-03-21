import React, {FunctionComponent, useContext, useCallback, ChangeEvent} from 'react';
import {Link as RouteLink} from 'react-router-dom';
import Cookie from 'js-cookie';
import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import StateContext from 'shared/context/StateContext';
import {BaseMobxState} from 'shared/typings/state';

const Header: FunctionComponent = observer(() => {
    const {
        i18n: {changeLocale, locale},
    } = useContext(StateContext) as BaseMobxState;
    const {t} = useTranslation();

    const onChange = useCallback(
        (evt: ChangeEvent<{name?: string | undefined; value: unknown}>) => {
            const value = evt.target.value as string;
            Cookie.set('locale', value);
            changeLocale(value);
        },
        [changeLocale],
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
