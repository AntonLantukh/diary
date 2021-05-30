import React, {FunctionComponent, useCallback} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '˜/components/Button';
import Error from '˜/components/Error';

import authService from 'client/service/auth';

import {AuthorizationForm} from '../../typings';

import css from './style.css';

const SignIn: FunctionComponent = () => {
    const {register, handleSubmit, errors} = useForm<AuthorizationForm>({});
    const {t} = useTranslation();

    const onSubmit = useCallback(async (form: AuthorizationForm) => {
        await authService.signIn(form);
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={css.signIn}>
            <FormControl fullWidth>
                <TextField
                    name="email"
                    // @ts-expect-error
                    inputRef={register({required: t('main:authorize.error.email')})}
                    label={t('main:authorize.field.email')}
                    variant="outlined"
                    type="email"
                    error={Boolean(errors.email)}
                />
                <Error name="email" errors={errors} />
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    name="password"
                    // @ts-expect-error
                    inputRef={register({required: t('main:authorize.error.password')})}
                    label={t('main:authorize.field.password')}
                    variant="outlined"
                    type="password"
                    error={Boolean(errors.password)}
                />
                <Error name="password" errors={errors} />
            </FormControl>
            <Button type="submit" variant="contained" size="large" onClick={handleSubmit(onSubmit)}>
                {t('main:authorize.button')}
            </Button>
        </form>
    );
};

export default SignIn;
