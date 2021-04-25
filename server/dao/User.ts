import {UserGetDB, UserCreateDB, UserId, UserUpdateDB} from '../typings/User';

import {logger} from '../logger';

import UserModel from '../model/User';

class UsersDao {
    async saveUser(userDb: UserCreateDB): Promise<number> {
        const user = await UserModel.create(userDb).then(user => {
            logger.info(`Created user ${JSON.stringify(user)}`);

            return user;
        });

        return user.id as number;
    }

    async getUsers(limit: number, page = 1): Promise<UserGetDB[]> {
        const users = ((await UserModel.find()
            .limit(limit)
            .skip(limit * page)
            .exec()
            .then(users => {
                logger.info(`Requested users ${JSON.stringify(users)}`);

                return users;
            })) as unknown) as UserGetDB[];

        return users;
    }

    async getUserById(userId: UserId): Promise<UserGetDB | null> {
        const user = (await UserModel.findById(userId).then(user => {
            if (user) {
                logger.info(`Found user ${JSON.stringify(user)} by userId ${userId}`);
            } else {
                logger.warn(`User by userId ${userId} not found`);
            }
        })) as UserGetDB | null;

        return user;
    }

    async getUserByEmail(email: string): Promise<UserGetDB | null> {
        const user = (await UserModel.findOne({email}).then(user => {
            if (user) {
                logger.info(`Found user ${JSON.stringify(user)} by email ${email}`);
            } else {
                logger.warn(`User by email ${email} not found`);
            }

            return user;
        })) as UserGetDB | null;

        return user;
    }

    async updateUser(userDb: UserUpdateDB): Promise<UserGetDB> {
        const updatedUser = (await UserModel.findOneAndUpdate({id: userDb['_id']}, userDb).then(user => {
            logger.info(`Updated user ${JSON.stringify(user)}`);

            return user;
        })) as UserGetDB;

        return updatedUser;
    }

    async deleteUser(userId: UserId): Promise<UserId> {
        await UserModel.findByIdAndDelete({id: userId}).then(user => {
            logger.info(`Deleted user ${JSON.stringify(user)}`);

            return user;
        });

        return userId;
    }
}

export default new UsersDao();
