import React, {FunctionComponent, useCallback} from 'react';
import {useForm} from 'react-hook-form';

import {MainState} from 'shared/state/Main';
import {useMobxState} from 'client/hooks/useMobxState';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import {RegistrationForm} from '../../typings';

import css from './style.css';

const Registration: FunctionComponent = () => {
    const {user} = useMobxState() as MainState;
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
                    inputRef={register({required: 'Укажите email'})}
                    label="Электронная почта"
                    variant="outlined"
                />
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    name="password"
                    inputRef={register({required: 'Укажите пароль'})}
                    label="Пароль"
                    variant="outlined"
                />
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    name="passwordConfirm"
                    inputRef={register({required: 'Укажите пароль'})}
                    label="Повторите пароль"
                    variant="outlined"
                />
            </FormControl>
            <Button type="submit" variant="contained" color="primary" onSubmit={handleSubmit(onSubmit)}>
                Зарегистрироваться
            </Button>
        </form>
    );
};

export default Registration;
