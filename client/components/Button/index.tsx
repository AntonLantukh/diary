import React, {FunctionComponent, ReactElement} from 'react';

import Button from '@material-ui/core/Button';

import css from './style.css';

type Props = {
    children: ReactElement | string;
    size: 'large' | 'small';
    variant: 'contained' | 'outlined';
    onClick: () => void;
    component?: ReactElement;
    type?: 'submit';
    to?: 'string';
};

const CustomButton: FunctionComponent<Props> = ({children, ...props}) => (
    <Button className={css.button} {...props}>
        {children}
    </Button>
);

export default CustomButton;
