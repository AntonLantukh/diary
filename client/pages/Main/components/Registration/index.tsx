import React, {FunctionComponent, useCallback} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import {RegistrationForm} from '../../typings';

import css from './style.css';

const Registration: FunctionComponent = () => {
    const {t} = useTranslation();
    const {register, handleSubmit} = useForm<RegistrationForm>({});
    const onSubmit = useCallback(async (form: RegistrationForm) => {
        await fetch('http://localhost:3000/api/user', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }, []);

    return (
        <form className={css.container} onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth>
                <TextField
                    name="email"
                    inputRef={register({required: t('main:register.error.email')})}
                    label={t('main:register.field.email')}
                    variant="outlined"
                />
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    name="password"
                    inputRef={register({required: t('main:register.error.password')})}
                    label={t('main:register.field.password')}
                    variant="outlined"
                />
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    name="passwordConfirm"
                    inputRef={register({required: t('main:register.error.passwordRepeat')})}
                    label={t('main:register.field.passwordRepeat')}
                    variant="outlined"
                />
            </FormControl>
            <Button type="submit" variant="contained" color="primary" onSubmit={handleSubmit(onSubmit)}>
                {t('main:register.button')}
            </Button>
        </form>
    );
};

export default Registration;
