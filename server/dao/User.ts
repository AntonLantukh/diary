import UserModel from '../models/User';
import {generatePassword, generateSalt} from '../utils/password';

import {User as UserType} from 'shared/typings/user';

type UserDaoType = {
    createUser(user: User): void;
    findUser(email: string): void;
};

class User implements UserDaoType {
    async createUser({email, password}: UserType) {
        const salt = await generateSalt();
        const passwordHash = await generatePassword(salt, password);

        await UserModel.create({email, passwordHash});
    }

    async findUser(email: string) {
        const user = await UserModel.findOne({email});

        return user;
    }
}

export default new User();
