import React, {FunctionComponent, useState, useCallback} from 'react';
import {useTranslation} from 'react-i18next';

import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

import SignIn from '../SignIn';
import SignUp from '../SignUp';

import css from './style.css';

const TYPE = {
    AUTHORIZATION: 'AUTHORIZATION',

    REGISTRATION: 'REGISTRATION',
};

const FormWrapper: FunctionComponent = () => {
    const {t} = useTranslation();
    const [formType, updateFormType] = useState(TYPE.AUTHORIZATION);
    const onChange = useCallback(
        (_, newType: keyof typeof TYPE) => {
            updateFormType(newType);
        },
        [updateFormType],
    );

    return (
        <Paper className={css.formWrapper} elevation={2}>
            <Tabs
                value={formType}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                onChange={onChange}
                centered
            >
                <Tab label={t('main:authorize.title')} value={TYPE.AUTHORIZATION} id={TYPE.AUTHORIZATION} />
                <Tab label={t('main:register.title')} value={TYPE.REGISTRATION} id={TYPE.REGISTRATION} />
            </Tabs>
            <div className={css.formWrapper__form}>
                <Typography color="textSecondary" variant="h5" component="h2" gutterBottom>
                    {formType === TYPE.AUTHORIZATION ? t('main:authorize.title') : t('main:register.title')}
                </Typography>
                {formType === TYPE.AUTHORIZATION ? <SignIn /> : <SignUp />}
            </div>
        </Paper>
    );
};

export default FormWrapper;
