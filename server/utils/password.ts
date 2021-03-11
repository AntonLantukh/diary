import crypto from 'crypto';

import config from '../config';

export const generatePassword = (salt: string, password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(
            password,
            salt,
            config.crypto.iterations,
            config.crypto.length,
            config.crypto.digest,
            (err, key) => {
                if (err) return reject(err);
                resolve(key.toString('hex'));
            },
        );
    });
};

export const generateSalt = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(config.crypto.length, (err, buffer) => {
            if (err) return reject(err);
            resolve(buffer.toString('hex'));
        });
    });
};
