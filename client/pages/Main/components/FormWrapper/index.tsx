import React, {FunctionComponent, useState, useCallback} from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Authorization from '../Authorization';
import Registration from '../Registration';

import css from './style.css';

const TYPE = {
    AUTHORIZATION: 'AUTHORIZATION',

    REGISTRATION: 'REGISTRATION',
};

const FormWrapper: FunctionComponent = () => {
    const [formType, updateFormType] = useState(TYPE.AUTHORIZATION);
    const onChange = useCallback(
        (_, newType: keyof typeof TYPE) => {
            updateFormType(newType);
        },
        [updateFormType],
    );

    return (
        <Card variant="outlined" className={css.root}>
            <Grid container spacing={1} direction="column">
                <Grid item>
                    <Tabs
                        value={formType}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        onChange={onChange}
                    >
                        <Tab label="Авторизация" value={TYPE.AUTHORIZATION} id={TYPE.AUTHORIZATION} />
                        <Tab label="Регистрация" value={TYPE.REGISTRATION} id={TYPE.REGISTRATION} />
                    </Tabs>
                </Grid>
                <Grid item>
                    <CardContent>
                        <Grid container spacing={3} direction="column">
                            <Grid item>
                                <Typography color="textSecondary" variant="h5" component="h2" gutterBottom>
                                    {formType === TYPE.AUTHORIZATION ? 'Авторизация' : 'Регистрация'}
                                </Typography>
                            </Grid>
                            <Grid>{formType === TYPE.AUTHORIZATION ? <Authorization /> : <Registration />}</Grid>
                        </Grid>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    );
};

export default FormWrapper;
