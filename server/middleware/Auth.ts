import {Request, Response, NextFunction} from 'express';
import createError from 'http-errors';

import userService from '../service/User';
import {userRegisterSchema, userLoginSchema} from '../validation/userSchema';
import {checkPassword} from '../utils/password';
import {verifyAccessToken, verifyRefreshToken} from '../utils/jwt';

import {UserCreateDto, UserLoginDto} from 'server/typings/User';

class AuthMiddleware {
    async validateRegisterData(req: Request, res: Response, next: NextFunction): Promise<void> {
        const result = (await userRegisterSchema.validateAsync(req.body).catch(error => {
            throw createError(400, error);
        })) as UserCreateDto;

        const user = await userService.readByEmail(result.email);

        if (user) {
            throw new createError.Conflict('Email already exists');
        }

        next();
    }

    async validateLoginData(req: Request, res: Response, next: NextFunction): Promise<void> {
        const result = (await userLoginSchema.validateAsync(req.body).catch(() => {
            throw new createError.Unauthorized('Invalid username or password');
        })) as UserLoginDto;

        const user = await userService.readByEmail(result.email);

        if (!user) {
            throw new createError.Unauthorized('Invalid username or password');
        }

        const isMatched = await checkPassword(result.password, user.password);

        if (!isMatched) {
            throw new createError.Unauthorized('Invalid username or password');
        }

        req.userId = user.id;

        next();
    }

    async validateAccessToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        const accessToken = req.cookies['Access-Token'] as string;

        if (!accessToken) {
            throw new createError.Unauthorized();
        }

        await verifyAccessToken(accessToken);
        next();
    }

    async validateRefreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        const refreshToken = req.cookies['Refresh-Token'] as string;

        if (!refreshToken) {
            res.redirect(302, '/main');
            return;
        }

        req.userId = await verifyRefreshToken(refreshToken).catch(() => {
            res.redirect(302, '/main');
            return '';
        });

        next();
    }
}

export default new AuthMiddleware();
