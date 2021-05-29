import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {BaseMobxState} from 'shared/typings/state';

import {useMobxState} from './useMobxState';
import {getUser} from 'shared/resolvers/user';

type ReturnProps = {
    user: string;
};

export const useFindUser = (): void => {
    // const {user} = useMobxState() as BaseMobxState;
    const {pathname} = useLocation();

    useEffect(() => {
        // const findUser = async () => getUser();
        // void findUser();
    }, [pathname]);
};
