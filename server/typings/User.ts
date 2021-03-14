export type UserId = number;

export type UserCreateDB = {
    password: string;
    salt: string;
    email: string;
    name?: string;
    surname?: string;
};

export type UserGetDB = {
    id: UserId;
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
    surname?: string;
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
    name?: string;
    surname?: string;
};
