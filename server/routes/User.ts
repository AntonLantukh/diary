import {Application} from 'express';

import {CommonRoutesConfig} from './Common';

import userController from '../controller/User';
import userMiddleware from '../middleware/User';

export class UserRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'UserRoutes');
    }

    configureRoutes(): Application {
        this.app.route('/api/user').get(userController.listUsers).post(userController.createUser);
        this.app
            .route('/api/user/:userId')
            .all(userMiddleware.validateUserExists)
            .get(userController.getUserById)
            .put(userController.updateUser)
            .delete(userController.removeUser);

        return this.app;
    }
}
