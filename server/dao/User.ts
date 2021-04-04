import {UserGetDto, UserCreateDto, UserGetDB, UserCreateDB, UserUpdateDto, UserId} from '../typings/User';

import {generatePassword} from '../utils/password';
import {logger} from '../logger';

import UserModel from '../model/User';
import userConverter from '../converter/User';

class UsersDao {
    async saveUser(userDto: UserCreateDto): Promise<number> {
        const password = await generatePassword(userDto.password);
        const user = await UserModel.create<UserCreateDB>(
            userConverter.userCreateDtoToCreateDb(userDto, {password}),
        ).then(user => {
            logger.info(`Created user ${JSON.stringify(user)}`);

            return user;
        });

        return user.id as number;
    }

    async getUsers(limit: number, page = 1): Promise<UserGetDto[]> {
        const users = ((await UserModel.find()
            .limit(limit)
            .skip(limit * page)
            .exec()
            .then(users => {
                logger.info(`Requested users ${JSON.stringify(users)}`);

                return users;
            })) as unknown) as UserGetDB[];
        const convertedUsers = users.map(userConverter.userGetDbToGetDto);

        return convertedUsers;
    }

    async getUserById(userId: UserId): Promise<UserGetDto> {
        const user = ((await UserModel.findById(userId).then(user => {
            if (user) {
                logger.info(`Found user ${JSON.stringify(user)} by userId ${userId}`);
            } else {
                logger.warn(`User by userId ${userId} not found`);
            }
        })) as unknown) as UserGetDto;

        return user;
    }

    async getUserByEmail(email: string): Promise<UserGetDto> {
        const user = ((await UserModel.findOne({email}).then(user => {
            if (user) {
                logger.info(`Found user ${JSON.stringify(user)} by email ${email}`);
            } else {
                logger.warn(`User by email ${email} not found`);
            }

            return user;
        })) as unknown) as UserGetDto;

        return user;
    }

    async updateUser(userDto: UserUpdateDto): Promise<UserGetDto> {
        const updatedUser = ((await UserModel.findOneAndUpdate({id: userDto.id}, userDto).then(user => {
            logger.info(`Updated user ${JSON.stringify(user)}`);

            return user;
        })) as unknown) as UserGetDto;

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
