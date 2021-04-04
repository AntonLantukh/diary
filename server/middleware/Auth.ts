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

        await checkPassword(result.password, user.password).catch(() => {
            throw new createError.Unauthorized('Invalid username or password');
        });

        req.userId = user.id;

        next();
    }

    async validateAccessToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new createError.Unauthorized();
        }

        const authHeaderContent = (authHeader || '').split(' ');
        const accessToken = authHeaderContent[1];

        await verifyAccessToken(accessToken);

        next();
    }

    async validateRefreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {refreshToken} = req.body as {refreshToken: string};

        if (!refreshToken) {
            throw new createError.Unauthorized();
        }

        req.userId = await verifyRefreshToken(refreshToken);

        next();
    }
}

export default new AuthMiddleware();
