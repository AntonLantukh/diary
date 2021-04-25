import React, {FunctionComponent, ReactElement} from 'react';

import Button from '@material-ui/core/Button';

import css from './style.css';

type Props = {
    children: ReactElement | string;
    size: 'large' | 'small';
    variant: 'contained' | 'outlined';
    onClick: () => void;
    type?: 'submit';
};

const CustomButton: FunctionComponent<Props> = ({children, size, variant, onClick, type}) => (
    <Button className={css.button} {...{variant, size, onClick, type}}>
        {children}
    </Button>
);

export default CustomButton;
