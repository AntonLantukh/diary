import {Router} from 'express';

import {CommonRouterConfig} from './Common';
import authController from '../controller/Auth';
import authMiddleware from '../middleware/Auth';

import {handleAsync} from '../middleware/async';

export class AuthRouter extends CommonRouterConfig {
    constructor() {
        const router = Router();

        super(router, 'AuthRouter');
    }

    configureRoutes(): Router {
        this.router
            .route('/register')
            .post([handleAsync(authMiddleware.validateRegisterData)], handleAsync(authController.register));
        this.router
            .route('/login')
            .post([handleAsync(authMiddleware.validateLoginData)], handleAsync(authController.login));
        this.router
            .route('/refresh-token')
            .post([handleAsync(authMiddleware.validateRefreshToken)], handleAsync(authController.refreshToken));
        this.router.route('/logout').post(handleAsync(authController.register));

        return this.router;
    }
}

export default new AuthRouter();
