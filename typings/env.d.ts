declare namespace NodeJS {
    export interface ProcessEnv {
        DB_USER: string;
        PORT: string;
        MONGO: string;
        SALT_LENGTH: number;
        ACCESS_TOKEN_SECRET: string;
        REFRESH_TOKEN_SECRET: string;
        ACCESS_TOKEN_DURATION: string;
        REFRESH_TOKEN_DURATION: string;
    }
}
