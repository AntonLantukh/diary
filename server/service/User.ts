import userDao from '../dao/User';

import {UserCreateDto, UserGetDto, UserUpdateDto, UserId} from '../typings/User';

class UsersService {
    async create(userDto: UserCreateDto) {
        return userDao.saveUser(userDto);
    }

    async deleteById(userId: UserId): Promise<UserId> {
        return userDao.deleteUser(userId);
    }

    async list(limit: number): Promise<UserGetDto[]> {
        return userDao.getUsers(limit);
    }

    async updateUser(userDto: UserUpdateDto): Promise<UserGetDto> {
        return userDao.updateUser(userDto);
    }

    async readById(userId: UserId): Promise<UserGetDto> {
        return userDao.getUserById(userId);
    }

    async readByEmail(email: string): Promise<UserGetDto> {
        return userDao.getUserByEmail(email);
    }
}

export default new UsersService();
