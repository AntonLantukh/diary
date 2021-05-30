import {Router} from 'express';

import {CommonRouterConfig} from './Common';
import clientController from '../controller/Client';

import {handleAsync} from '../middleware/async';

export class ClientRouter extends CommonRouterConfig {
    constructor() {
        const router = Router();

        super(router, 'ClientRouter');
    }

    configureRoutes(): Router {
        this.router.route('/main').get(handleAsync(clientController.generatePage));
        this.router.route('/cabinet').get(handleAsync(clientController.generatePage));
        this.router.route('/*').get(handleAsync(clientController.generatePage));

        return this.router;
    }
}

export default new ClientRouter();
