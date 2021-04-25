import React, {FunctionComponent} from 'react';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import css from './style.css';
import stackshare from './stackshare.svg';
import logoSmall from './logoSmall.svg';

const Footer: FunctionComponent = () => (
    <footer className={css.footer}>
        <div className={css.footer__container}>
            <div className={css.footer__copyright}>
                <img width="48" height="48" src={logoSmall} />
                <Typography variant="body1">2021 ©</Typography>
            </div>
            <div className={css.footer__icons}>
                <Link color="inherit" target="__blank" href="https://github.com/AntonLantukh">
                    <GitHubIcon style={{fontSize: 36}} />
                </Link>
                <Link color="inherit" target="__blank" href="https://stackshare.io/lantukhanton">
                    <img width="46" height="36" src={stackshare} />
                </Link>
                <Link color="primary" target="__blank" href="https://www.linkedin.com/in/anton-lantukh-10b27684/">
                    <LinkedInIcon style={{fontSize: 46}} />
                </Link>
            </div>
        </div>
    </footer>
);

export default Footer;
