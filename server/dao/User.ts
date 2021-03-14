import {UserGetDto, UserCreateDto, UserGetDB, UserCreateDB, UserUpdateDto, UserId} from '../typings/User';

import {generateSalt, generatePassword} from '../utils/password';
import UserModel from '../model/User';
import userConverter from '../converter/User';

class UsersDao {
    async saveUser(userDto: UserCreateDto): Promise<number> {
        const salt = await generateSalt();
        const password = await generatePassword(salt, userDto.password);

        const user = await UserModel.create<UserCreateDB>(
            userConverter.userCreateDtoToCreateDb(userDto, {password, salt}),
        );

        return user.id as number;
    }

    async getUsers(limit: number): Promise<UserGetDto[]> {
        const users = ((await UserModel.find({}, null, {limit})) as unknown) as UserGetDB[];
        const convertedUsers = users.map(userConverter.userGetDbToGetDto);

        return convertedUsers;
    }

    async getUser(userId: UserId): Promise<UserGetDto> {
        const user = ((await UserModel.findById(userId)) as unknown) as UserGetDto;

        return user;
    }

    async updateUser(userDto: UserUpdateDto): Promise<UserGetDto> {
        const updatedUser = ((await UserModel.findOneAndUpdate({id: userDto.id}, userDto)) as unknown) as UserGetDto;

        return updatedUser;
    }

    async deleteUser(userId: UserId): Promise<number> {
        await UserModel.findByIdAndDelete({id: userId});

        return userId;
    }
}

export default new UsersDao();
