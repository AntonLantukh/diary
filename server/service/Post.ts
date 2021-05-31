import postDao from '../dao/Post';

import {PostCreateDto, PostUpdateDto, PostGetDto, PostId} from '../typings/Post';

import postConverter from '../converter/Post';

class PostService {
    async create(postDto: PostCreateDto) {
        return postDao.savePost(postDto);
    }

    async deleteById(postId: PostId): Promise<PostId> {
        return postDao.deletePost(postId);
    }

    async list(limit: number): Promise<PostGetDto[]> {
        const posts = await postDao.getPosts(limit);
        const convertedPosts = posts.map(postConverter.postGetDbToGetDto);

        return convertedPosts;
    }

    async update(userDto: PostUpdateDto): Promise<PostGetDto> {
        const convertedPost = postConverter.postUpdateDtoToUpdateDb(userDto);
        const updatedPost = await postDao.updatePost(convertedPost);

        return postConverter.postGetDbToGetDto(updatedPost);
    }

    async readById(postId: PostId): Promise<PostGetDto | null> {
        const postDb = await postDao.getPostById(postId);

        return postDb ? postConverter.postGetDbToGetDto(postDb) : null;
    }
}

export default new PostService();
