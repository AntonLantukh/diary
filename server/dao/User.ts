import {UserGetDto, UserCreateDto, UserGetDB, UserCreateDB, UserUpdateDto, UserId} from '../typings/User';

import {generateSalt, generatePassword} from '../utils/password';
import {logger} from '../logger';

import UserModel from '../model/User';
import userConverter from '../converter/User';

class UsersDao {
    async saveUser(userDto: UserCreateDto): Promise<number> {
        const salt = await generateSalt();
        const password = await generatePassword(salt, userDto.password);

        const user = await UserModel.create<UserCreateDB>(
            userConverter.userCreateDtoToCreateDb(userDto, {password, salt}),
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

    async getUser(userId: UserId): Promise<UserGetDto> {
        const user = ((await UserModel.findById(userId).then(user => {
            logger.info(`Found user ${JSON.stringify(user)}`);

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

    async deleteUser(userId: UserId): Promise<number> {
        await UserModel.findByIdAndDelete({id: userId}).then(user => {
            logger.info(`Deleted user ${JSON.stringify(user)}`);

            return user;
        });

        return userId;
    }
}

export default new UsersDao();
