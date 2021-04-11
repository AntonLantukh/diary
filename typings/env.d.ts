declare namespace NodeJS {
    export interface ProcessEnv {
        DB_USER: string;
        PORT: number;
        MONGODB_URI: string;
        MONGODB_NAME: string;
        REDIS_HOST: string;
        REDIS_PORT: number;
        SALT_LENGTH: number;
        ACCESS_TOKEN_SECRET: string;
        ACCESS_TOKEN_DURATION: string;
        ACCESS_TOKEN_TTL: number;
        REFRESH_TOKEN_SECRET: string;
        REFRESH_TOKEN_DURATION: string;
        REFRESH_TOKEN_TTL: number;
    }
}
