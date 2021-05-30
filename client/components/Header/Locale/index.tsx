import React, {FunctionComponent, useContext, useCallback, ChangeEvent, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';
import Cookie from 'js-cookie';
import localeService from 'client/service/locale';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import StateContext from 'shared/context/StateContext';
import {BaseMobxState} from 'shared/typings/state';

import {COMMON_NAMESPACES} from 'shared/constants/i18n';

const LOCALE = {
    RU: 'ru',

    EN: 'en',
};

const Locale: FunctionComponent = observer(() => {
    const {
        common: {keysetName},
    } = useContext(StateContext) as BaseMobxState;
    const {t, i18n} = useTranslation();
    const [locale, changeLocale] = useState(i18n.language);

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

    return (
        <TextField
            select
            size="small"
            id="locale-select"
            value={locale}
            onChange={onChange}
            variant="outlined"
            label={t('header:locale.label')}
        >
            {Object.values(LOCALE).map(l => (
                <MenuItem key={l} value={l}>
                    {t(`header:locale.${l}`)}
                </MenuItem>
            ))}
        </TextField>
    );
});

export default Locale;
