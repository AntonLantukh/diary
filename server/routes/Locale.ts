import {Application} from 'express';

import {CommonRoutesConfig} from './Common';

import localeController from '../controller/Locale';
import {handleAsync} from '../middleware/async';

export class LocaleRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'LocaleRoutes');
    }

    configureRoutes(): Application {
        this.app.route('/api/locale').get(handleAsync(localeController.getLocaleByPage));

        return this.app;
    }
}
