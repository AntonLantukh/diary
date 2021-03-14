import {Common} from 'shared/typings/common';

declare global {
    interface Window {
        __INITIAL_STATE__: string | Record<string, Common>;
        location: {
            pathname: string;
        };
    }
}
