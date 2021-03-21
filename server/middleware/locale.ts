import {Request, Response, NextFunction} from 'express';
import acceptLanguage from 'accept-language';

import {LOCALE} from '../constants/locale';

acceptLanguage.languages(Object.values(LOCALE));

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const getCookeLocale = (req: Request): string | undefined => req.cookies.locale as string | undefined;
const getQueryLocale = (req: Request): string | undefined => (req.query.locale ? String(req.query.locale) : undefined);
const getHeadersLocale = (req: Request): string | undefined => req.headers['accept-language'];

const detectLocale = (req: Request, res: Response, next: NextFunction): void => {
    const lookupOrder = [getQueryLocale, getCookeLocale, getHeadersLocale];
    const locale = lookupOrder.map(func => func(req)).find(Boolean);

    req.language = acceptLanguage.get(locale) || LOCALE.EN;

    next();
};

export default detectLocale;
