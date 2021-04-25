import {
    UserCreateDB,
    UserGetDB,
    UserGetSecureDto,
    UserGetInsecureDto,
    UserCreateDto,
    UserUpdateDto,
    UserUpdateDB,
} from '../typings/User';

type ParamsToDb = {
    password: string;
};

class UserConverter {
    userGetDbToGetSecureDto(userDb: UserGetDB): UserGetSecureDto {
        const {_id, email, name, surname} = userDb;

        return {id: _id, email, name, surname};
    }

    userGetDbToGetInsecureDto(userDb: UserGetDB): UserGetInsecureDto {
        const {_id, email, password, name, surname} = userDb;

        return {id: _id, email, password, name, surname};
    }

    userUpdateDtoToUpdateDb(userDto: UserUpdateDto): UserUpdateDB {
        const {id, email, password, name, surname} = userDto;

        return {_id: id, email, password, name, surname};
    }

    userCreateDtoToCreateDb(userDto: UserCreateDto, {password}: ParamsToDb): UserCreateDB {
        const {email} = userDto;

        return {email, password, isArchived: false};
    }
}

export default new UserConverter();
