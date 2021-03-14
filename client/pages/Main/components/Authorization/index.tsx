import React, {FunctionComponent, useCallback} from 'react';
import {useForm} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import {AuthorizationForm} from '../../typings';

import css from './style.css';

const Authorization: FunctionComponent = () => {
    const {register, handleSubmit, errors} = useForm<AuthorizationForm>({});

    const onSubmit = useCallback((form: AuthorizationForm) => {
        console.log(form);
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={css.container}>
            <FormControl fullWidth>
                <TextField
                    name="email"
                    inputRef={register({required: 'Укажите email'})}
                    label="Электронная почта"
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
                    inputRef={register({required: 'Укажите пароль'})}
                    label="Пароль"
                    variant="outlined"
                    type="password"
                    error={Boolean(errors.password)}
                />
                <div className={css.error}>
                    <ErrorMessage errors={errors} name="password" />
                </div>
            </FormControl>
            <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                Ввойти
            </Button>
        </form>
    );
};

export default Authorization;
