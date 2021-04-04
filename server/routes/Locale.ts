import {Router} from 'express';

import {CommonRouterConfig} from './Common';

import localeController from '../controller/Locale';
import {handleAsync} from '../middleware/async';

export class LocaleRouter extends CommonRouterConfig {
    constructor() {
        const router = Router();

        super(router, 'LocaleRouter');
    }

    configureRoutes(): Router {
        this.router.route('/').get(handleAsync(localeController.getLocaleByPage));

        return this.router;
    }
}

export default new LocaleRouter();
