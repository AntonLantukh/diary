import {PostGetDB, PostCreateDB, PostId, PostUpdateDB} from '../typings/Post';

import {logger} from '../logger';

import PostModel from '../model/Post';

class PostDao {
    async savePost(postDb: PostCreateDB): Promise<number> {
        const post = await PostModel.create(postDb).then(post => {
            logger.info(`Created post ${JSON.stringify(post)}`);

            return post;
        });

        return post.id as number;
    }

    async getPosts(limit: number, page = 1): Promise<PostGetDB[]> {
        const posts = ((await PostModel.find()
            .limit(limit)
            .skip(limit * page)
            .exec()
            .then(posts => {
                logger.info(`Requested posts ${JSON.stringify(posts)}`);

                return posts;
            })) as unknown) as PostGetDB[];

        return posts;
    }

    async getPostById(postId: PostId): Promise<PostGetDB | null> {
        const post = (await PostModel.findById(postId).then(post => {
            if (post) {
                logger.info(`Found post ${JSON.stringify(post)} by postId ${postId}`);

                return post;
            } else {
                logger.warn(`Post by userId ${postId} not found`);
            }
        })) as PostGetDB | null;

        return post;
    }

    async updatePost(postDb: PostUpdateDB): Promise<PostGetDB> {
        const updatedPost = (await PostModel.findOneAndUpdate({id: postDb['_id']}, postDb).then(post => {
            logger.info(`Updated post ${JSON.stringify(post)}`);

            return post;
        })) as PostGetDB;

        return updatedPost;
    }

    async deletePost(postId: PostId): Promise<PostId> {
        await PostModel.findByIdAndDelete({id: postId}).then(post => {
            logger.info(`Deleted post ${JSON.stringify(post)}`);

            return post;
        });

        return postId;
    }
}

export default new PostDao();
