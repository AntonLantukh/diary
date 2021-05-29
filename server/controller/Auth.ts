import {Request, Response} from 'express';

import usersService from '../service/User';
import {generateAccessToken, generateRefreshToken, deleteRefreshToken} from '../utils/jwt';

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
} as const;

class AuthController {
    async signUp(req: Request, res: Response): Promise<void> {
        const userId = await usersService.create(req.body);

        res.status(200).send({id: userId});
    }

    async signIn(req: Request, res: Response): Promise<void> {
        const accessToken = await generateAccessToken(req.userId);
        const refreshToken = await generateRefreshToken(req.userId);

        res.cookie('X-Refresh-Token', refreshToken, {
            maxAge: Number(process.env.REFRESH_TOKEN_TTL),
            ...COOKIE_OPTIONS,
        });

        res.status(200).send({accessToken}).redirect('/main');
    }

    async refreshToken(req: Request, res: Response): Promise<void> {
        const accessToken = await generateAccessToken(req.userId);
        const refreshToken = await generateRefreshToken(req.userId);

        res.header('X-Access-Token', accessToken);
        res.cookie('X-Refresh-Token', refreshToken, {
            maxAge: Number(process.env.REFRESH_TOKEN_TTL),
            ...COOKIE_OPTIONS,
        });

        res.status(200).send();
    }

    async logout(req: Request, res: Response): Promise<void> {
        await deleteRefreshToken(req.userId);

        res.clearCookie('X-Refresh-Token');

        res.status(200).send();
    }
}

export default new AuthController();
