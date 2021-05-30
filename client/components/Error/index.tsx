import React, {FunctionComponent} from 'react';

import {ErrorMessage} from '@hookform/error-message';
import Typography from '@material-ui/core/Typography';

import css from './style.css';

type Props = {
    name: string;
    errors: Record<string, unknown>;
};

const Error: FunctionComponent<Props> = ({errors, name}) => (
    <Typography variant="caption" className={css.error}>
        <ErrorMessage errors={errors} name={name} />
    </Typography>
);

export default Error;
