import {Request, Response} from 'express';

import postService from '../service/Post';

class PostController {
    async listUsers(req: Request, res: Response): Promise<void> {
        const posts = await postService.list(100);

        res.status(200).send(posts);
    }

    async getPostById(req: Request, res: Response): Promise<void> {
        const post = await postService.readById(req.params.postId);

        res.status(200).send(post);
    }

    async createPost(req: Request, res: Response): Promise<void> {
        const postId = await postService.create(req.body);

        res.status(200).send({id: postId});
    }

    async updatePost(req: Request, res: Response): Promise<void> {
        const post = await postService.update({id: req.params.postId, ...req.body});

        res.status(200).send(post);
    }

    async removePost(req: Request, res: Response): Promise<void> {
        await postService.deleteById(Number(req.params.postId));

        res.status(200).send(req.params.userId);
    }
}

export default new PostController();
