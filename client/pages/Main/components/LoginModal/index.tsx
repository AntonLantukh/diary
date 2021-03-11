import React, {FunctionComponent} from 'react';
import {observer} from 'mobx-react-lite';

import {MainState} from 'shared/state/Main';
import {useState} from '˜/hooks/useState';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import css from './style.css';

const Main: FunctionComponent = observer(() => {
    const {user} = useState() as MainState;

    return (
        <Card variant="outlined" className={css.root}>
            <CardContent>
                <Grid container spacing={3} direction="column">
                    <Grid item>
                        <Typography color="textSecondary" variant="h5" component="h2" gutterBottom>
                            Регистрация тут
                        </Typography>
                    </Grid>
                    <Grid item>
                        <div className={css.container}>
                            <FormControl fullWidth>
                                <TextField
                                    label="Электронная почта"
                                    variant="outlined"
                                    value={user.name}
                                    onChange={evt => user.editName(evt.target.value)}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField
                                    label="Пароль"
                                    variant="outlined"
                                    value={''}
                                    onChange={evt => user.editName(evt.target.value)}
                                />
                            </FormControl>
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
});

export default Main;
