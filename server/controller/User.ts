import {Request, Response} from 'express';

import usersService from '../service/User';

class UserController {
    async listUsers(req: Request, res: Response): Promise<void> {
        const users = await usersService.list(100);

        res.status(200).send(users);
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        const user = await usersService.readById(Number(req.params.userId));

        res.status(200).send(user);
    }

    async createUser(req: Request, res: Response): Promise<void> {
        const userId = await usersService.create(req.body);

        res.status(200).send({id: userId});
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        const user = await usersService.updateUser({id: req.params.userId, ...req.body});

        res.status(200).send(user);
    }

    async removeUser(req: Request, res: Response): Promise<void> {
        await usersService.deleteById(Number(req.params.userId));

        res.status(200).send(req.params.userId);
    }
}

export default new UserController();
