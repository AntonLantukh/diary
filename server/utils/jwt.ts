import JWT from 'jsonwebtoken';
import process from 'process';
import createError from 'http-errors';

import {UserId} from 'server/typings/User';

type Token = {
    iat: number;
    exp: number;
    aud: UserId;
    iss: string;
};

export const generateAccessToken = (userId: UserId): Promise<string> => {
    return new Promise((resolve, reject) => {
        const options = {
            expiresIn: process.env.ACCESS_TOKEN_DURATION,
            issuer: 'diary.ru',
            audience: userId,
        };

        JWT.sign({}, process.env.ACCESS_TOKEN_SECRET, options, (err, token) => {
            if (err) {
                reject(new createError.InternalServerError());
            }
            resolve(token as string);
        });
    });
};

export const verifyAccessToken = (accessToken: string): Promise<UserId> => {
    return new Promise((resolve, reject) => {
        JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            // Extracting UserId
            const {aud} = decoded as Token;

            if (err) {
                throw reject(createError(403, {name: err?.name}));
            }

            resolve(aud);
        });
    });
};

export const generateRefreshToken = (userId: UserId): Promise<string> => {
    return new Promise((resolve, reject) => {
        const options = {
            expiresIn: process.env.REFRESH_TOKEN_DURATION,
            issuer: 'diary.ru',
            audience: userId,
        };

        JWT.sign({}, process.env.REFRESH_TOKEN_SECRET, options, (err, token) => {
            if (err) {
                reject(new createError.InternalServerError());
            }

            resolve(token as string);
        });
    });
};

export const verifyRefreshToken = (refreshToken: string): Promise<UserId> => {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            // Extracting UserId
            const {aud} = decoded as Token;

            if (err) {
                throw reject(createError(403, {name: err?.name}));
            }

            resolve(aud);
        });
    });
};
