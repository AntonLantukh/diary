import {Request, Response, NextFunction} from 'express';

import userService from '../service/User';
import {verifyAccessToken} from '../utils/jwt';

class UsersMiddleware {
    async validateUserExists(req: Request, res: Response, next: NextFunction): Promise<void> {
        const user = await userService.readById(req.params.userId);

        if (user) {
            next();
        } else {
            res.status(404).send({error: `User ${req.params.userId} not found`});
        }
    }

    async attachUserIfPresent(req: Request, res: Response, next: NextFunction): Promise<void> {
        const accessToken = req.cookies['X-Access-Token'] as string;
        let userId;

        if (!accessToken) {
            req.user = null;
        }

        try {
            userId = await verifyAccessToken(accessToken);
            req.user = await userService.readById(userId);
        } catch {
            req.user = null;
        }

        next();
    }
}

export default new UsersMiddleware();
