import React, {FunctionComponent, useContext, useCallback} from 'react';
import {Link as RouteLink} from 'react-router-dom';
import {observer} from 'mobx-react-lite';

import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import StateContext from 'shared/context/StateContext';
import {BaseMobxState} from 'shared/typings/state';

import authService from 'client/service/auth';

import css from './style.css';

const Auth: FunctionComponent = observer(() => {
    const {user} = useContext(StateContext) as BaseMobxState;

    const onSignOut = useCallback(async () => {
        await authService.signOut();
    }, []);

    const email = user?.email || '';
    const firstLetter = email.slice(0, 1);
    const emailFormatted = email.length > 30 ? `${email.slice(0, 30)}...` : email;

    return (
        <div className={css.user}>
            {user ? (
                <div className={css.user__name}>
                    <Link to="/cabinet" component={RouteLink} className={css.user__link}>
                        <Chip color="primary" label={emailFormatted} avatar={<Avatar>{firstLetter}</Avatar>} />
                    </Link>
                    <Link onClick={onSignOut} className={css.user__link}>
                        <Typography variant="body2">Sign out</Typography>
                    </Link>
                </div>
            ) : (
                <Link to="/auth" component={RouteLink} className={css.user__link}>
                    <Typography variant="body2">Sign In</Typography>
                </Link>
            )}
        </div>
    );
});

export default Auth;
