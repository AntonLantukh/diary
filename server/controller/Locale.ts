import {Request, Response} from 'express';

import {I18nKeys} from 'shared/typings/i18n';
import {COMMON_NAMESPACES} from 'shared/constants/i18n';

import {setupI18Next} from '../i18n';

type Params = {
    page: string;
    locale: string;
};

class LocaleController {
    async getLocaleByPage(req: Request, res: Response): Promise<void> {
        const {page, locale} = req.query as Params;
        const i18nServer = await setupI18Next(locale);
        await i18nServer.changeLanguage(locale);

        const i18nPageKeys = (i18nServer.getResourceBundle(locale, page) as unknown) as I18nKeys;
        const commonKeys = COMMON_NAMESPACES.reduce(
            (acc, ns) => ({...acc, ...i18nServer.getResourceBundle(locale, ns)}),
            {},
        );

        res.status(200).send({...i18nPageKeys, ...commonKeys});
    }
}

export default new LocaleController();
