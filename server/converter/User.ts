import {UserCreateDB, UserGetDB, UserGetDto, UserCreateDto} from '../typings/User';

type ParamsToDb = {
    password: string;
};

class UserConverter {
    userGetDbToGetDto(userDb: UserGetDB): UserGetDto {
        const {_id, email, name, password, surname} = userDb;

        return {id: _id, email, password, name, surname};
    }

    userCreateDtoToCreateDb(userDto: UserCreateDto, {password}: ParamsToDb): UserCreateDB {
        const {email} = userDto;

        return {email, password, isArchived: false};
    }
}

export default new UserConverter();
