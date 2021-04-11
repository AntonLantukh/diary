import request from 'shared/request';

type GetUserArgs = Record<string, never>;

export const getUser = async (params: GetUserArgs = {}): Promise<void> =>
    request.buildRequest<void>({url: '/api/user', params});
