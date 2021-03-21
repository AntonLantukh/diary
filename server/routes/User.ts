import {Application} from 'express';

import {CommonRoutesConfig} from './Common';

import userController from '../controller/User';
import userMiddleware from '../middleware/User';
import {handleAsync} from '../middleware/async';

export class UserRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'UserRoutes');
    }

    configureRoutes(): Application {
        this.app
            .route('/api/user')
            .get(handleAsync(userController.listUsers))
            .post(handleAsync(userController.createUser));
        this.app
            .route('/api/user/:userId')
            .all(userMiddleware.validateUserExists)
            .get(handleAsync(userController.getUserById))
            .put(handleAsync(userController.updateUser))
            .delete(handleAsync(userController.removeUser));

        return this.app;
    }
}
