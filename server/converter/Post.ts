import {PostGetDB, PostGetDto, PostUpdateDB, PostUpdateDto, PostCreateDB, PostCreateDto} from '../typings/Post';

class PostConverter {
    postGetDbToGetDto(postDb: PostGetDB): PostGetDto {
        const {_id, title, date, description} = postDb;

        return {id: _id.toString(), title, date, description};
    }

    postUpdateDtoToUpdateDb(postDto: PostUpdateDto): PostUpdateDB {
        const {id, title, date, description} = postDto;

        return {_id: id, title, date, description, isArchived: false};
    }

    userCreateDtoToCreateDb(postDto: PostCreateDto): PostCreateDB {
        const {title, date, description} = postDto;

        return {title, date, description, isArchived: false};
    }
}

export default new PostConverter();
