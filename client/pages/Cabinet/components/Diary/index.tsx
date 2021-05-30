import React, {FunctionComponent} from 'react';

import {MENU} from '../../constants';
import type {MenuEnum} from '../../typings';

import PostList from './PostList';
import CreatePost from './CreatePost';

import css from './style.css';

type Props = {
    selectedMode: MenuEnum;
};

const COMPONENTS_MAPPER = {
    [MENU.LIST]: <PostList />,
    [MENU.CREATE]: <CreatePost />,
} as const;

const Content: FunctionComponent<Props> = ({selectedMode}) => (
    <div className={css.diary}>{COMPONENTS_MAPPER[selectedMode]}</div>
);

export default Content;
