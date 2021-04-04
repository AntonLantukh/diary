import {Router} from 'express';

import {CommonRouterConfig} from './Common';

import userController from '../controller/User';
import userMiddleware from '../middleware/User';
import {handleAsync} from '../middleware/async';

export class UserRouter extends CommonRouterConfig {
    constructor() {
        const router = Router();

        super(router, 'UserRouter');
    }

    configureRoutes(): Router {
        this.router.route('/').get(handleAsync(userController.listUsers)).post(handleAsync(userController.createUser));

        this.router
            .route('/:userId')
            .all(userMiddleware.validateUserExists)
            .get(handleAsync(userController.getUserById))
            .put(handleAsync(userController.updateUser))
            .delete(handleAsync(userController.removeUser));

        return this.router;
    }
}

export default new UserRouter();
