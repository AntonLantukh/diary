import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {getUser} from 'shared/resolvers/user';

type ReturnProps = {
    user: string;
};

export const useFindUser = (): void => {
    const {pathname} = useLocation();

    useEffect(() => {
        const findUser = async () => getUser();

        void findUser();
    }, [pathname]);
};
