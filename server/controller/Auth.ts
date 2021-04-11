import {Request, Response} from 'express';

import usersService from '../service/User';
import {generateAccessToken, generateRefreshToken, deleteRefreshToken} from '../utils/jwt';

class AuthController {
    async register(req: Request, res: Response): Promise<void> {
        const userId = await usersService.create(req.body);

        res.status(200).send({id: userId});
    }

    async login(req: Request, res: Response): Promise<void> {
        const accessToken = await generateAccessToken(req.userId);
        const refreshToken = await generateRefreshToken(req.userId);

        res.cookie('Access-Token', accessToken, {
            maxAge: Number(process.env.ACCESS_TOKEN_TTL),
            httpOnly: true,
            secure: true,
        });
        res.cookie('Refresh-Token', refreshToken, {
            maxAge: Number(process.env.REFRESH_TOKEN_TTL),
            httpOnly: true,
            secure: true,
        });

        res.status(200).send();
    }

    async refreshToken(req: Request, res: Response): Promise<void> {
        const accessToken = await generateAccessToken(req.userId);
        const refreshToken = await generateRefreshToken(req.userId);

        res.cookie('Access-Token', accessToken, {
            maxAge: Number(process.env.ACCESS_TOKEN_TTL),
            httpOnly: true,
            secure: true,
        });
        res.cookie('Refresh-Token', refreshToken, {
            maxAge: Number(process.env.REFRESH_TOKEN_TTL),
            httpOnly: true,
            secure: true,
        });

        res.status(200).send();
    }

    async logout(req: Request, res: Response): Promise<void> {
        await deleteRefreshToken(req.userId);

        res.status(200).send();
    }
}

export default new AuthController();
