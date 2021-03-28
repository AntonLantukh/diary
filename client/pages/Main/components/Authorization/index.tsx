import React, {FunctionComponent, useCallback} from 'react';
import {useForm} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import {useTranslation} from 'react-i18next';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import {AuthorizationForm} from '../../typings';

import css from './style.css';

const Authorization: FunctionComponent = () => {
    const {register, handleSubmit, errors} = useForm<AuthorizationForm>({});
    const {t} = useTranslation();

    const onSubmit = useCallback((form: AuthorizationForm) => {
        // eslint-disable-next-line no-console
        console.log(form);
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={css.container}>
            <FormControl fullWidth>
                <TextField
                    name="email"
                    // @ts-ignore
                    inputRef={register({required: t('main:authorize.error.email')})}
                    label={t('main:authorize.field.email')}
                    variant="outlined"
                    type="email"
                    error={Boolean(errors.email)}
                />
                <div className={css.error}>
                    <ErrorMessage errors={errors} name="email" />
                </div>
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    name="password"
                    // @ts-ignore
                    inputRef={register({required: t('main:authorize.error.password')})}
                    label={t('main:authorize.field.password')}
                    variant="outlined"
                    type="password"
                    error={Boolean(errors.password)}
                />
                <div className={css.error}>
                    <ErrorMessage errors={errors} name="password" />
                </div>
            </FormControl>
            <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                {t('main:authorize.button')}
            </Button>
        </form>
    );
};

export default Authorization;
