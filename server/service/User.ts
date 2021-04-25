import userDao from '../dao/User';

import {UserCreateDto, UserGetSecureDto, UserGetInsecureDto, UserUpdateDto, UserId} from '../typings/User';

import {generatePassword} from '../utils/password';
import userConverter from '../converter/User';

class UsersService {
    async create(userDto: UserCreateDto) {
        const password = await generatePassword(userDto.password);
        const userCreateDb = userConverter.userCreateDtoToCreateDb(userDto, {password});

        return userDao.saveUser(userCreateDb);
    }

    async deleteById(userId: UserId): Promise<UserId> {
        return userDao.deleteUser(userId);
    }

    async list(limit: number): Promise<UserGetSecureDto[]> {
        const users = await userDao.getUsers(limit);
        const convertedUsers = users.map(userConverter.userGetDbToGetSecureDto);

        return convertedUsers;
    }

    async updateUser(userDto: UserUpdateDto): Promise<UserGetSecureDto> {
        const convertedUser = userConverter.userUpdateDtoToUpdateDb(userDto);
        const updatedUser = await userDao.updateUser(convertedUser);

        return userConverter.userGetDbToGetSecureDto(updatedUser);
    }

    async readById(userId: UserId): Promise<UserGetSecureDto | null> {
        const userDb = await userDao.getUserById(userId);

        return userDb ? userConverter.userGetDbToGetSecureDto(userDb) : null;
    }

    async readByEmail(email: string): Promise<UserGetInsecureDto | null> {
        const userDb = await userDao.getUserByEmail(email);

        return userDb ? userConverter.userGetDbToGetInsecureDto(userDb) : null;
    }
}

export default new UsersService();
