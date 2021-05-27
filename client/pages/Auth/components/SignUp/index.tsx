import React, {FunctionComponent, useCallback} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '˜/components/Button';

import {signUpUser} from 'shared/resolvers/auth';

import {RegistrationForm} from '../../typings';

import css from './style.css';

const SignUp: FunctionComponent = () => {
    const {t} = useTranslation();
    const {register, handleSubmit} = useForm<RegistrationForm>({});
    const onSubmit = useCallback(async (form: RegistrationForm) => {
        await signUpUser(form);
    }, []);

    return (
        <form className={css.signUp} onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth>
                <TextField
                    name="email"
                    // @ts-expect-error
                    inputRef={register({required: t('main:register.error.email')})}
                    label={t('main:register.field.email')}
                    variant="outlined"
                />
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    name="password"
                    // @ts-expect-error
                    inputRef={register({required: t('main:register.error.password')})}
                    label={t('main:register.field.password')}
                    variant="outlined"
                />
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    name="passwordConfirm"
                    // @ts-expect-error
                    inputRef={register({required: t('main:register.error.passwordRepeat')})}
                    label={t('main:register.field.passwordRepeat')}
                    variant="outlined"
                />
            </FormControl>
            <Button type="submit" variant="contained" size="large" onSubmit={handleSubmit(onSubmit)}>
                {t('main:register.button')}
            </Button>
        </form>
    );
};

export default SignUp;
