export type PostId = string;

export type PostCreateDB = {
    title: string;
    date: string;
    description: string;
    isArchived: false;
};

export type PostUpdateDB = {
    _id: PostId;
    title: string;
    date: string;
    description: string;
    isArchived: false;
};

export type PostGetDB = {
    _id: PostId;
    title: string;
    date: string;
    description: string;
    isArchived: false;
};

export type PostGetDto = {
    id: PostId;
    title: string;
    date: string;
    description: string;
};

export type PostCreateDto = PostCreateDB;

export type PostUpdateDto = {
    id: PostId;
    title: string;
    date: string;
    description: string;
};
