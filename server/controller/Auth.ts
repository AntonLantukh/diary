import {Request, Response} from 'express';

import usersService from '../service/User';
import {generateAccessToken, generateRefreshToken} from '../utils/jwt';

class AuthController {
    async register(req: Request, res: Response): Promise<void> {
        const userId = await usersService.create(req.body);

        res.status(200).send({id: userId});
    }

    async login(req: Request, res: Response): Promise<void> {
        const accessToken = await generateAccessToken(req.userId);
        const refreshToken = await generateRefreshToken(req.userId);

        res.status(200).send({accessToken, refreshToken});
    }

    async refreshToken(req: Request, res: Response): Promise<void> {
        const accessToken = await generateAccessToken(req.userId);
        const refreshToken = await generateRefreshToken(req.userId);

        res.status(200).send({accessToken, refreshToken});
    }
}

export default new AuthController();
