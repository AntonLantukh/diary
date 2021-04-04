export type UserId = string;

export type UserCreateDB = {
    password: string;
    email: string;
    name?: string;
    surname?: string;
    isArchived: boolean;
};

export type UserGetDB = {
    _id: UserId;
    password: string;
    salt: string;
    email: string;
    name?: string;
    surname?: string;
    isArchived: string;
};

export type UserCreateDto = {
    email: string;
    password: string;
    passwordConfirm: string;
};

export type UserLoginDto = {
    email: string;
    password: string;
};

export type UserUpdateDto = {
    id: UserId;
    email: string;
    password: string;
    name: string;
    surname: string;
};

export type UserGetDto = {
    id: UserId;
    email: string;
    password: string;
    name?: string;
    surname?: string;
};
