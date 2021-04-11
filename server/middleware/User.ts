import {Request, Response, NextFunction} from 'express';

import userService from '../service/User';

class UsersMiddleware {
    async validateUserExists(req: Request, res: Response, next: NextFunction): Promise<void> {
        const user = await userService.readById(req.params.userId);

        if (user) {
            next();
        } else {
            res.status(404).send({error: `User ${req.params.userId} not found`});
        }
    }
}

export default new UsersMiddleware();
