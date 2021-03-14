import {UserCreateDB, UserGetDB, UserGetDto, UserCreateDto} from '../typings/User';

type ParamsToDb = {
    password: string;
    salt: string;
};

class UserConverter {
    userGetDbToGetDto(userDb: UserGetDB): UserGetDto {
        const {id, email, name, surname} = userDb;

        return {id, email, name, surname};
    }

    userCreateDtoToCreateDb(userDto: UserCreateDto, {password, salt}: ParamsToDb): UserCreateDB {
        const {email} = userDto;

        return {email, password, salt};
    }
}

export default new UserConverter();
