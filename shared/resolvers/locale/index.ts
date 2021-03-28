import request from 'shared/request';

import {I18nKeys} from 'shared/typings/i18n';

type GetLocaleArgs = {
    locale: string;
    page: string;
};

export const getLocale = async (params: GetLocaleArgs): Promise<I18nKeys> =>
    request.buildRequest<I18nKeys>('/api/locale', params);
