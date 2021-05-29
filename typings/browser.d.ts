import {BaseState} from 'shared/typings/state';

declare global {
    interface Window {
        __INITIAL_STATE__: string | BaseState;
        location: {
            pathname: string;
            href: string;
        };
    }
}
