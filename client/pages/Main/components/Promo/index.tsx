import React, {FunctionComponent} from 'react';
import {Link as RouteLink} from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '˜/components/Button';

import css from './style.css';

const Promo: FunctionComponent = () => (
    <div className={css.promo}>
        <Typography className={css.promo__header} variant="h2">
            Начните вести свою историю
        </Typography>
        <div className={css.promo__button}>
            <Button variant="contained" size="large" component={RouteLink} to="/auth">
                Зарегистрироваться
            </Button>
        </div>
    </div>
);

export default Promo;
