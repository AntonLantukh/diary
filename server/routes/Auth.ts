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
            .route('/sign-up')
            .post([handleAsync(authMiddleware.validateRegisterData)], handleAsync(authController.signUp));
        this.router
            .route('/sign-in')
            .post([handleAsync(authMiddleware.validateLoginData)], handleAsync(authController.signIn));
        this.router
            .route('/refresh-token')
            .get([handleAsync(authMiddleware.validateRefreshToken)], handleAsync(authController.refreshToken));
        this.router
            .route('/logout')
            .post([handleAsync(authMiddleware.validateRefreshToken)], handleAsync(authController.logout));

        return this.router;
    }
}

export default new AuthRouter();
