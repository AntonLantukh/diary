import {ParsedQs} from 'qs';

export type Common = {
    isInitialized?: boolen;
    query: ParsedQs;
    pathName: string;
    pageName: string;
};
