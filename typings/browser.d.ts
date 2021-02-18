import {Common} from 'shared/typings/common';

export declare global {
    interface Window {
        __INITIAL_STATE__: string | Record<string, Common>;
        location: {
            pathname: string;
        };
    }
}
