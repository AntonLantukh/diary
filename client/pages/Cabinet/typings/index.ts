import {MENU} from '../constants';

export type MenuEnum = keyof typeof MENU;

export type CreatePostForm = {
    title: string;
    description: string;
    date: string;
};
