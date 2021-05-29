import request from 'client/request';

import {API_ROUTE} from 'shared/constants/routes';
import {I18nKeys} from 'shared/typings/i18n';

type GetLocaleArgs = {
    locale: string;
    page: string;
};

class LocaleService {
    async getLocale(params: GetLocaleArgs): Promise<I18nKeys> {
        const response = await request.buildRequest<I18nKeys>({url: API_ROUTE.locale, params});

        return response;
    }
}

export default new LocaleService();
